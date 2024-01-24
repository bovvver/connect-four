package com.github.connectfour.responses;

import com.github.connectfour.dtos.ConnectionDTO;
import com.github.connectfour.models.Room;
import org.springframework.http.HttpStatus;

public class ConnectionResponse extends BaseResponse<ConnectionDTO> {
    public ConnectionResponse(Integer statusCode, String message, String roomCode, Room room) {
        super(statusCode, message, new ConnectionDTO(roomCode, room));
    }

    public ConnectionResponse(HttpStatus statusCode, String message, String roomCode, Room room) {
        super(statusCode, message, new ConnectionDTO(roomCode, room));
    }
}
