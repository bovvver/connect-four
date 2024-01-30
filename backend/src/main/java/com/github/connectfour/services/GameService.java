package com.github.connectfour.services;

import com.github.connectfour.enums.GameActions;
import com.github.connectfour.messages.MoveMessage;
import com.github.connectfour.models.Room;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class GameService {
    private final ConnectionService connectionService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void startGame(String roomCode, Principal principal) {
        Room currentRoom = connectionService.getRooms().get(roomCode);

        if (checkRoomAccessDenial(roomCode, principal)) return;

        if (currentRoom.getPlayer1() == null || currentRoom.getPlayer2() == null) {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(GameActions.WAIT_FOR_PLAYER));
        } else {
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), ResponseEntity.ok(GameActions.GAME_START));
        }
    }

    public void makeMove(MoveMessage message, Principal principal) {
        String roomCode = message.roomCode();
        String principalName = principal.getName();
        Room currentRoom = connectionService.getRooms().get(roomCode);

        if (checkRoomAccessDenial(roomCode, principal)) return;

        if(!currentRoom.getTurn().getUuid().equals(principalName)) {
            simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.ok(GameActions.ACCESS_DENIED));
            return;
        }
    }

    private boolean checkRoomAccessDenial(String roomCode, Principal principal) {
        Room room = connectionService.getRooms().get(roomCode);

        String player1Uuid = room.getPlayer1().getUuid();
        String player2Uuid = room.getPlayer2().getUuid();
        String principalName = principal.getName();

        if(!player1Uuid.equals(principalName) && !player2Uuid.equals(principalName)) {
            ResponseEntity<GameActions> response = new ResponseEntity<>(GameActions.ACCESS_DENIED, HttpStatus.FORBIDDEN);
            simpMessagingTemplate.convertAndSend(getRoomCodeUrl(roomCode), response);
            return true;
        } else return false;
    }

    private String getRoomCodeUrl(String roomCode) {
        return String.format("/topic/room/%s", roomCode);
    }
}
