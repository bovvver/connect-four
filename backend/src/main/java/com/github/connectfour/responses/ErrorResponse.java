package com.github.connectfour.responses;

import org.springframework.http.HttpStatusCode;

public class ErrorResponse extends BaseResponse<Object> {
    public ErrorResponse(HttpStatusCode statusCode, String message) {
        super(statusCode.value(), message, null);
    }
}
