package com.astu.ibolympapi.auth.dto;

public record AuthenticationResponse(
        String tokenType,
        String accessToken,
        Long expires_in
) {
}
