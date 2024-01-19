package com.github.connectfour.controllers;

import com.github.connectfour.messages.CreateRoomMessage;
import com.github.connectfour.messages.JoinRoomMessage;
import com.github.connectfour.services.WebSocketService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class WebSocketController {
    private final WebSocketService webSocketService;

    @MessageMapping("/createRoom")
    public void createRoom(@Payload CreateRoomMessage createRoomMessage) {
        webSocketService.createRoom(createRoomMessage);
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload JoinRoomMessage joinRoomMessage) {
        webSocketService.joinRoom(joinRoomMessage);
    }
}
