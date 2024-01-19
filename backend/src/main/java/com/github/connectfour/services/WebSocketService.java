package com.github.connectfour.services;

import com.github.connectfour.messages.CreateRoomMessage;
import com.github.connectfour.messages.JoinRoomMessage;
import com.github.connectfour.models.Player;
import com.github.connectfour.models.Room;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class WebSocketService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final Map<String, Room> rooms;

    @Value("${env.room.code.length}")
    private Integer ROOM_CODE_LENGTH;

    public WebSocketService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.rooms = new HashMap<>();
    }

    public void createRoom(CreateRoomMessage createRoomMessage) {
        Player player = new Player(createRoomMessage.username());
        Room newRoom = new Room(player);
        String roomCode;

        do {
            roomCode = generateRoomCode(ROOM_CODE_LENGTH);
        } while (rooms.containsKey(roomCode));

        rooms.put(roomCode, newRoom);

        this.simpMessagingTemplate.convertAndSend(getTopicEndpointUrl(roomCode), newRoom);
    }

    public void joinRoom(JoinRoomMessage joinRoomMessage) {
        String roomCode = joinRoomMessage.roomCode();
        Room room = rooms.get(roomCode);
        checkRoomAvailability(room);

        Player secondPlayer = new Player(joinRoomMessage.username());
        room.setPlayer2(secondPlayer);

        this.simpMessagingTemplate.convertAndSend(getTopicEndpointUrl(roomCode), room);
    }

    private void checkRoomAvailability(Room room) {
        if (room == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room with this code doesn't exist.");
        else if (room.getPlayer1() != null && room.getPlayer2() != null)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Room is already full.");
    }

    private String generateRoomCode(int codeLength) {
        StringBuilder sb = new StringBuilder(codeLength);
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        for (int i = 0; i < codeLength; i++) {
            int charIndex = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(charIndex));
        }

        return sb.toString();
    }

    private static String getTopicEndpointUrl(String roomCode) {
        return String.format("/topic/room/%s", roomCode);
    }
}
