package com.github.connectfour.services;

import com.github.connectfour.enums.GameState;
import com.github.connectfour.enums.TileState;
import com.github.connectfour.messages.MoveMessage;
import com.github.connectfour.models.Room;
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
        Room room = connectionService.getRooms().get(roomCode);

        if (!validateCurrentTurn(room, principalName)) return;

        TileState[][] newBoard = updateColumn(room, principalName, message.column(), room.getBoardRowLength() - 1);

        if (room.getBoardState() == newBoard) {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.status(400).body(room));
            return;
        } else {
            GameState newGameState = room.getGameState() == GameState.PLAYER1_MOVE ? GameState.PLAYER2_MOVE : GameState.PLAYER1_MOVE;
            room.setBoardState(newBoard);
            room.setGameState(newGameState);
            connectionService.getRooms().put(roomCode, room);
        }
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

    private TileState[][] updateColumn(Room room, String principalName, int column, int row) {
        TileState[][] roomBoard = room.getBoardState();

        if (row < 0) return roomBoard;

        if (room.getBoardState()[column][row] == TileState.EMPTY) {
            roomBoard[column][row] = room.getGameState().equals(GameState.PLAYER1_MOVE) ? TileState.RED : TileState.YELLOW;
            return roomBoard;
        } else return updateColumn(room, principalName, column, row - 1);
    }

    private boolean validateCurrentTurn(Room room, String principalName) {
        if (room.getGameState() == GameState.PLAYER1_MOVE && room.getTurn() == room.getPlayer1())
            return true;

        if(room.getGameState() == GameState.PLAYER2_MOVE && room.getTurn() == room.getPlayer2())
            return true;

        simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.status(403).body(GameState.ACCESS_DENIED));
        return false;
    }
}
