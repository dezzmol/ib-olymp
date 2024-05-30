package com.astu.ibolympapi.tokens;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final Core core;

    public String extractUsernameFromJWT(String jwt) {
        return core.getUsernameFromJwt(jwt);
    }

    public boolean validateToken(String jwt) {
        return core.validateToken(jwt);
    }

    public String generateAccessToken(String username, TokenType tokenType) {
        return core.generateAccessToken(username, tokenType);
    }

    public String generateRefreshToken(String email, TokenType tokenType) {
        return core.generateRefreshToken(email, tokenType);
    }

    public String generateActivateToken(String email, TokenType tokenType) {
        return core.generateActivateToken(email, tokenType);
    }
}
