package com.github.connectfour.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Player turn;

    @JsonIgnore
    private final Integer BOARD_COLUMN_COUNT = 7;
    @JsonIgnore
    private final Integer BOARD_ROW_COUNT = 6;

    public Room(Player player1) {
        this.player1 = player1;
        this.player2 = null;
        this.boardState = new char[BOARD_COLUMN_COUNT][BOARD_ROW_COUNT];
        this.turn = player1;
    }
}
