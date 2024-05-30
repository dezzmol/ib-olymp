package com.astu.ibolympapi.tokens;

import com.astu.ibolympapi.tokens.entities.Token;
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
