package com.github.connectfour.services;

import com.github.connectfour.enums.GameState;
import com.github.connectfour.enums.TileState;
import com.github.connectfour.messages.MoveMessage;
import com.github.connectfour.models.Room;
import com.github.connectfour.responses.BoardUpdateResponse;
import com.github.connectfour.utils.RoomUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class GameService {
    private final RoomUtils roomUtils;
    private final ConnectionService connectionService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void startGame(String roomCode, Principal principal) {
        Room currentRoom = connectionService.getRooms().get(roomCode);
        String principalName = principal.getName();

        if (!roomUtils.checkRoomAvailability(currentRoom, principalName)) return;

        if (checkRoomAccessDenial(roomCode, principalName)) return;

        if (currentRoom.getPlayer1() == null || currentRoom.getPlayer2() == null) {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(GameState.WAIT_FOR_START));
        } else {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(GameState.PLAYER1_MOVE));
        }
    }

    public void prepareMove(MoveMessage message, Principal principal) {
        String roomCode = message.roomCode();
        String principalName = principal.getName();
        Room currentRoom = connectionService.getRooms().get(roomCode);

        if (checkRoomAccessDenial(roomCode, principalName)) return;

        if (!currentRoom.getTurn().getUuid().equals(principalName)) {
            simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.status(403).body(GameState.ACCESS_DENIED));
            return;
        }

        makeMove(message, principalName);
    }

    private void makeMove(MoveMessage message, String principalName) {
        String roomCode = message.roomCode();
        int column = message.column();

        Room room = connectionService.getRooms().get(roomCode);

        if (!validateCurrentTurn(room, principalName)) return;

        BoardUpdateResponse newBoard = updateColumn(room, principalName, column, room.getBoardRowLength() - 1);
        TileState[][] updatedBoard = newBoard.updatedBoard();

        if (room.getBoardState() == updatedBoard) {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.status(400).body(room));
        } else {
            room.setBoardState(updatedBoard);
            boolean isWinner = checkForWin(room, column, newBoard.populatedRow());
            resolveTurn(room, roomCode, isWinner);
        }
    }

    private void resolveTurn(Room room, String roomCode, boolean isWinner) {
        GameState newGameState;

        if (!isWinner) {
            newGameState = room.getGameState() == GameState.PLAYER1_MOVE ? GameState.PLAYER2_MOVE : GameState.PLAYER1_MOVE;
            room.setGameState(newGameState);
            connectionService.getRooms().put(roomCode, room);

            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(room));
            return;
        }

        newGameState = room.getGameState() == GameState.PLAYER1_MOVE ? GameState.PLAYER1_WIN : GameState.PLAYER2_WIN;
        room.setGameState(newGameState);

        if(newGameState == GameState.PLAYER1_WIN) room.getPlayer1().incrementScore();
        else if(newGameState == GameState.PLAYER2_WIN) room.getPlayer2().incrementScore();

        connectionService.getRooms().put(roomCode, room);

        simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(room));
    }

    private boolean checkForWin(Room room, int column, int row) {
        TileState[][] board = room.getBoardState();
        TileState tileColor = board[column][row];

        if (checkDirection(column, row, 1, 0, board, tileColor)) return true;
        if (checkDirection(column, row, 0, 1, board, tileColor)) return true;
        if (checkDirection(column, row, 1, 1, board, tileColor)) return true;
        if (checkDirection(column, row, 1, -1, board, tileColor)) return true;
        return false;
    }

    private boolean checkDirection(int column, int row, int dx, int dy, TileState[][] board, TileState tileColor) {
        int count = 1;

        count += countInDirection(column, row, dx, dy, board, tileColor);
        count += countInDirection(column, row, -dx, -dy, board, tileColor);

        return count >= 4;
    }

    private int countInDirection(int column, int row, int dx, int dy, TileState[][] board, TileState tileColor) {
        int count = 0;
        int currentColumn = column + dx;
        int currentRow = row + dy;

        while (isValidPosition(currentColumn, currentRow) && board[currentColumn][currentRow] == tileColor) {
            count++;
            currentColumn += dx;
            currentRow += dy;
        }

        return count;
    }

    private boolean isValidPosition(int column, int row) {
        return column >= 0 && column < 7 && row >= 0 && row < 6;
    }

    private boolean checkRoomAccessDenial(String roomCode, String principalName) {
        Room room = connectionService.getRooms().get(roomCode);

        if (!roomUtils.checkRoomAvailability(room, principalName)) return true;

        String player1Uuid = room.getPlayer1().getUuid();
        String player2Uuid = room.getPlayer2().getUuid();

        if (!player1Uuid.equals(principalName) && !player2Uuid.equals(principalName)) {
            ResponseEntity<GameState> response = new ResponseEntity<>(GameState.ACCESS_DENIED, HttpStatus.FORBIDDEN);
            simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", response);
            return true;
        } else return false;
    }

    private String getRoomCodeUrl(String roomCode) {
        return String.format("/topic/room/%s", roomCode);
    }

    private BoardUpdateResponse updateColumn(Room room, String principalName, int column, int row) {
        TileState[][] roomBoard = room.getBoardState();

        if (row < 0) return new BoardUpdateResponse(roomBoard);

        if (room.getBoardState()[column][row] == TileState.EMPTY) {
            roomBoard[column][row] = room.getGameState().equals(GameState.PLAYER1_MOVE) ? TileState.RED : TileState.YELLOW;
            return new BoardUpdateResponse(roomBoard, row);
        } else return updateColumn(room, principalName, column, row - 1);
    }

    private boolean validateCurrentTurn(Room room, String principalName) {
        if (room.getGameState() == GameState.PLAYER1_MOVE && room.getTurn() == room.getPlayer1())
            return true;

        if (room.getGameState() == GameState.PLAYER2_MOVE && room.getTurn() == room.getPlayer2())
            return true;

        simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.status(403).body(GameState.ACCESS_DENIED));
        return false;
    }
}
