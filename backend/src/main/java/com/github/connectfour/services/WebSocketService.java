package com.github.connectfour.services;

import com.github.connectfour.models.Player;
import com.github.connectfour.models.Room;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WebSocketService {
    private final Map<String, Room> rooms = new HashMap<>();;

    public Map<String, Room> createRoom(String playerNickname, String roomCode) {
        Player player = new Player(playerNickname);
        Room newRoom = new Room(player);

        rooms.put(roomCode, newRoom);

        return rooms;
    }

    public Room joinRoom(String playerUsername, String roomCode) {
        Room room = rooms.get(roomCode);

        if (room != null && room.getPlayer2() == null) {
            Player secondPlayer = new Player(playerUsername);
            room.setPlayer2(secondPlayer);

            return room;
        }
        return null; // TODO: change later or throw exception.
    }
}
