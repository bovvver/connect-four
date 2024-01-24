package com.github.connectfour.controllers;

import com.github.connectfour.messages.CreateRoomMessage;
import com.github.connectfour.messages.JoinRoomMessage;
import com.github.connectfour.services.ConnectionService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@AllArgsConstructor
public class ConnectionController {
    private ConnectionService connectionService;

    @MessageMapping("/createRoom")
    public void createRoom(CreateRoomMessage message, Principal principal) {
        connectionService.createRoom(message, principal);
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(JoinRoomMessage message, Principal principal) {
        connectionService.joinRoom(message, principal);
    }
}
