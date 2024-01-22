package com.github.connectfour.services;

import com.github.connectfour.messages.ConnectionMessage;
import com.github.connectfour.models.Player;
import com.github.connectfour.models.Room;
import org.springframework.http.HttpStatus;
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

    public void createRoom(ConnectionMessage message, Principal principal) {
        Player player = new Player(message.nickname());
        Room newRoom = new Room(player);
        String roomCode = message.roomCode();

        rooms.put(roomCode, newRoom);

        simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/room", newRoom);
    }

    public void joinRoom(ConnectionMessage message, Principal principal) {
        String roomCode = message.roomCode();
        Room room = rooms.get(roomCode);
        checkRoomAvailability(room);

        Player secondPlayer = new Player(message.nickname());
        room.setPlayer2(secondPlayer);
        simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/room", room);
    }

    private void checkRoomAvailability(Room room) {
        if (room == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room with this code doesn't exist.");
        else if (room.getPlayer1() != null && room.getPlayer2() != null)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Room is already full.");
    }
}

