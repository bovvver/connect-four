package com.github.connectfour.utils;

import com.github.connectfour.models.Room;
import com.github.connectfour.responses.ErrorResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class RoomUtils {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public boolean checkRoomAvailability(Room room, String principalName) {
        if (room == null) {
            returnError(HttpStatus.NOT_FOUND, "Room with this code doesn't exist.", principalName);
            return false;
        } else if (room.getPlayer1() != null && room.getPlayer2() != null) {
            returnError(HttpStatus.FORBIDDEN, "Room is already full.", principalName);
            return false;
        }
        return true;
    }

    private void returnError(HttpStatus httpStatus, String errorMessage, String principalName) {
        ErrorResponse error = new ErrorResponse(httpStatus, errorMessage);
        ResponseEntity<ErrorResponse> response = new ResponseEntity<>(error, httpStatus);
        simpMessagingTemplate.convertAndSendToUser(principalName, "/queue/room", response);
    }
}
