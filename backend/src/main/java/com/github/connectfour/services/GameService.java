package com.github.connectfour.services;

import com.github.connectfour.messages.MoveMessage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class GameService {
    private ConnectionService connectionService;

    public void startGame(String roomCode, Principal principal) {
    }

    public void makeMove(MoveMessage message, Principal principal) {
    }
}
