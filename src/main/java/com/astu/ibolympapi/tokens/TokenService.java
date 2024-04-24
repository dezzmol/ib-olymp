package com.astu.ibolympapi.tokens;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final Core core;

    public String extractUserEmailFromJWT(String jwt) {
        return core.getUserEmailFromJwt(jwt);
    }

    public boolean validateToken(String jwt) {
        return core.validateToken(jwt);
    }

    public String generateAccessToken(String email, TokenType tokenType) {
        return core.generateAccessToken(email, tokenType);
    }

    public String generateRefreshToken(String email, TokenType tokenType) {
        return core.generateRefreshToken(email, tokenType);
    }
}
