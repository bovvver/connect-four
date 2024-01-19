package com.github.connectfour.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
    private Player player1;
    private Player player2;
    private char[][] boardState;

    public Room(Player player1) {
        this.player1 = player1;
        this.player2 = null;
        this.boardState = new char[7][6];
    }
}
