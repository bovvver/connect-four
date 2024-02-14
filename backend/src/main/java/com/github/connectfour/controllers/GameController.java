package com.github.connectfour.controllers;

import com.github.connectfour.messages.MoveMessage;
import com.github.connectfour.services.GameService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@AllArgsConstructor
public class GameController {
    private GameService gameService;

    @MessageMapping("/startGame")
    public void startGame(String roomCode, Principal principal) {
        gameService.startGame(roomCode, principal);
    }

    @MessageMapping("/move")
    public void makeMove(MoveMessage message, Principal principal) {
        gameService.prepareMove(message, principal);
    }

    @MessageMapping("/restart")
    public void restartGame(String roomCode, Principal principal) {
        gameService.restartGame(roomCode, principal);
    }
}
