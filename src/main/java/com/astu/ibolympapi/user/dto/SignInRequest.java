package com.astu.ibolympapi.user.dto;

public record SignInRequest(
        String username,
        String password
) {
}
