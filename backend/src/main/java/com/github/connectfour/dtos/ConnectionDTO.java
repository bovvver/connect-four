package com.github.connectfour.dtos;

import com.github.connectfour.models.Room;

public record ConnectionDTO(String roomCode, Room room) {
}
