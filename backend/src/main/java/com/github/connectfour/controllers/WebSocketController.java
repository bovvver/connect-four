package com.github.connectfour.controllers;

import com.github.connectfour.models.Room;
import com.github.connectfour.services.WebSocketService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@AllArgsConstructor
public class WebSocketController {
    private final WebSocketService webSocketService;

    @MessageMapping("/createRoom")
    @SendTo("/topic/room/{roomCode}")
    public Map<String, Room> createRoom(@Payload String playerNickname, @DestinationVariable String roomCode) {
        return webSocketService.createRoom(playerNickname, roomCode);
    }

    @MessageMapping("/joinRoom")
    @SendTo("/topic/room/{roomCode}")
    public Room joinRoom(@Payload String playerNickname, @DestinationVariable String roomCode) {
        return webSocketService.joinRoom(playerNickname, roomCode);
    }
}
