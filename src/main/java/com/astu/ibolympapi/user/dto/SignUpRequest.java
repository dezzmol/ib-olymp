package com.astu.ibolympapi.user.dto;

public record SignUpRequest(
        String name,
        String surname,
        String patronymic,
        String username,
        String email,
        String password
) {
}
