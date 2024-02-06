package com.github.connectfour.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.connectfour.enums.GameState;
import com.github.connectfour.enums.TileState;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;

@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"player1", "player2", "turn"})
public class Room {
    private Player player1;
    private Player player2;
    private TileState[][] boardState;
    private GameState gameState;
    private Player turn;

    @JsonIgnore
    private final Integer BOARD_COLUMN_COUNT = 7;
    @JsonIgnore
    private final Integer BOARD_ROW_COUNT = 6;

    public Room(Player player1) {
        this.player1 = player1;
        this.player2 = null;
        this.boardState = new TileState[BOARD_COLUMN_COUNT][BOARD_ROW_COUNT];
        this.gameState = GameState.WAIT_FOR_START;
        this.turn = player1;

        for (int i = 0; i < BOARD_COLUMN_COUNT; i++)
            Arrays.fill(boardState[i], TileState.EMPTY);
    }

    public Player getPlayer1() {
        return player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public TileState[][] getBoardState() {
        return boardState;
    }

    public GameState getGameState() {
        return gameState;
    }

    public Player getTurn() {
        return turn;
    }

    public Integer getBoardColumnLength() {
        return BOARD_COLUMN_COUNT;
    }

    public Integer getBoardRowLength() {
        return BOARD_ROW_COUNT;
    }
}
