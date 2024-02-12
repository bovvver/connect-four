package com.github.connectfour.responses;

import com.github.connectfour.enums.TileState;

public record BoardUpdateResponse(TileState[][] updatedBoard, Integer populatedRow) {
    public BoardUpdateResponse(TileState[][] updatedBoard) {
        this(updatedBoard, null);
    }
}
