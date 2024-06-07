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
    INVALID_REFRESH_TOKEN("Invalid refresh token", HttpStatusCode.valueOf(401)),
    EMAIL_NOT_VERIFIED("Email not verified", HttpStatusCode.valueOf(403)),
    EMAIL_ALREADY_REGISTERED("Email already registered", HttpStatusCode.valueOf(403)),
    ERROR_WHILE_SENDING_LETTER("Error while sending letter", HttpStatusCode.valueOf(400)),
    USER_NOT_FOUND("User didn't found", HttpStatusCode.valueOf(404)),
    FILE_NOT_FOUND("File not found", HttpStatusCode.valueOf(404)),
    STUDENT_ALREADY_REGISTERED("Student already registered", HttpStatusCode.valueOf(403)),
    USER_ALREADY_REGISTERED("User already registered", HttpStatusCode.valueOf(403)),
    STUDENT_HAS_TEAM("Student has a team already", HttpStatusCode.valueOf(403)),
    STUDENT_NOT_FOUND("Student not found", HttpStatusCode.valueOf(404)),
    STUDENT_HAS_NOT_TEAM("Student has not team", HttpStatusCode.valueOf(403)),
    STUDENT_IS_NOT_CAPTAIN("Student is not captain", HttpStatusCode.valueOf(403)),
    TEAM_IS_FULL("Team is full", HttpStatusCode.valueOf(403)),
    TEAM_NOT_FOUND("Team not found", HttpStatusCode.valueOf(404)),
    TOKEN_NOT_FOUND("Token not found", HttpStatusCode.valueOf(404)),
    OLYMPIAD_NOT_FOUND("Olympiad not found", HttpStatusCode.valueOf(404)),
    CATEGORY_NOT_FOUND("Category not found", HttpStatusCode.valueOf(404)),
    TASK_NOT_FOUND("Task not found", HttpStatusCode.valueOf(404)),
    TASK_IS_NOT_IN_OLYMPIAD("Task is not in olympiad", HttpStatusCode.valueOf(403)),
    COUlD_NOT_STORE_FILE("Could Not Store File", HttpStatusCode.valueOf(404));
    private final String message;
    private final HttpStatusCode statusCode;
}
