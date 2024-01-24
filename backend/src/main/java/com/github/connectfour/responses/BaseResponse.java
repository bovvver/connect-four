package com.github.connectfour.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse<T> {
    private Integer statusCode;
    private String message;
    private T data;

    public BaseResponse(Integer statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public BaseResponse(HttpStatus statusCode, String message, T data) {
        this(statusCode.value(), message, data);
    }
}
