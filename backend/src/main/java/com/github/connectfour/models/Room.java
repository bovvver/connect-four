package com.github.connectfour.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Room {
    private Player player1;
    private Player player2;
    private char[][] boardState;

    private Integer BOARD_COLUMN_COUNT = 6;
    private Integer BOARD_ROW_COUNT = 7;

    public Room(Player player1) {
        this.player1 = player1;
        this.player2 = null;
        this.boardState = new char[BOARD_COLUMN_COUNT][BOARD_ROW_COUNT];
    }
}
