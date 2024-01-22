package com.github.connectfour.controllers;

import com.github.connectfour.messages.ConnectionMessage;
import com.github.connectfour.services.ConnectionService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@AllArgsConstructor
public class ConnectionController {
    private ConnectionService connectionService;

    @MessageMapping("/createRoom")
    @SendToUser("/queue/room")
    public void createRoom(ConnectionMessage message, Principal principal) {
        connectionService.createRoom(message, principal);
    }

    @MessageMapping("/joinRoom")
    @SendToUser("/queue/room")
    public void joinRoom(ConnectionMessage message, Principal principal) {
        connectionService.joinRoom(message, principal);
    }
}
