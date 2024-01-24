package com.github.connectfour.services;

import com.github.connectfour.messages.CreateRoomMessage;
import com.github.connectfour.messages.JoinRoomMessage;
import com.github.connectfour.models.Player;
import com.github.connectfour.models.Room;
import com.github.connectfour.responses.ConnectionResponse;
import com.github.connectfour.responses.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Service
public class ConnectionService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final Map<String, Room> rooms;

    public ConnectionService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.rooms = new HashMap<>();
    }

    public void createRoom(CreateRoomMessage message, Principal principal) {
        String principalName = principal.getName();
        Player player = new Player(message.nickname(), principalName);
        Room newRoom = new Room(player);
        String roomCode;

        do {
            roomCode = generateRoomCode(6);
        } while (rooms.containsKey(roomCode));

        rooms.put(roomCode, newRoom);

        ConnectionResponse response = new ConnectionResponse(HttpStatus.OK, "Room created.", roomCode, newRoom);
        simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.ok(response));
    }

    public void joinRoom(JoinRoomMessage message, Principal principal) {
        String principalName = principal.getName();
        String roomCode = message.roomCode();
        Room room = rooms.get(roomCode);

        try {
            checkRoomAvailability(room);
        } catch (ResponseStatusException e) {
            ErrorResponse error = new ErrorResponse(e.getStatusCode(), e.getReason());
            ResponseEntity<ErrorResponse> response = new ResponseEntity<>(error, e.getStatusCode());
            simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", response);
            return;
        }

        Player secondPlayer = new Player(message.nickname(),principalName);

        if (room.getPlayer1() == null) room.setPlayer1(secondPlayer);
        else if (room.getPlayer2() == null) room.setPlayer2(secondPlayer);

        ConnectionResponse response = new ConnectionResponse(HttpStatus.OK, "Room joined.", roomCode, room);
        simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", ResponseEntity.ok(response));
    }

    private void checkRoomAvailability(Room room) {
        if (room == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room with this code doesn't exist.");
        else if (room.getPlayer1() != null && room.getPlayer2() != null)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Room is already full.");
    }

    private static String generateRoomCode(int codeLength) {
        StringBuilder sb = new StringBuilder(codeLength);
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        for (int i = 0; i < codeLength; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }
}

