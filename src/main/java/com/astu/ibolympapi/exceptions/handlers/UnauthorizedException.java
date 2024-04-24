package com.astu.ibolympapi.exceptions.handlers;

import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import lombok.Getter;

import javax.naming.AuthenticationException;

@Getter
public class UnauthorizedException extends AuthenticationException {
    private ErrorCode errorCode;

    public UnauthorizedException(ErrorCode errorType) {
        super(errorType.getMessage());
    }
}
