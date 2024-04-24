package com.astu.ibolympapi.exceptions.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    UNAUTHORIZED_ACCESS("Unauthorized access", HttpStatusCode.valueOf(401)),
    INVALID_CREDENTIALS("Invalid credentials", HttpStatusCode.valueOf(401)),
    EXPIRED_TOKEN("Expired token", HttpStatusCode.valueOf(401)),
    INVALID_ACCESS_TOKEN("Invalid access token", HttpStatusCode.valueOf(401)),
    EMAIL_NOT_VERIFIED("Email not verified", HttpStatusCode.valueOf(403)),
    EMAIL_ALREADY_REGISTERED("Email already registered", HttpStatusCode.valueOf(403)),
    ERROR_WHILE_SENDING_LETTER("Error while sending letter", HttpStatusCode.valueOf(400)),
    FILE_NOT_FOUND("File not found", HttpStatusCode.valueOf(404));
    @Getter
    private final String message;
    private final HttpStatusCode statusCode;
}