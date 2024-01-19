package com.github.connectfour.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class Room {
    private Player player1;
    private Player player2;
    private char[][] boardState;

    @Value("${env.board.column.count}")
    private Integer BOARD_COLUMN_COUNT;
    @Value("${env.board.row.count}")
    private Integer BOARD_ROW_COUNT;

    public Room(Player player1) {
        this.player1 = player1;
        this.player2 = null;
        this.boardState = new char[BOARD_COLUMN_COUNT][BOARD_ROW_COUNT];
    }
}
