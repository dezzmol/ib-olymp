package com.astu.ibolympapi.tokens;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class Core {
    @Value("${jwt.secret.key}")
    private String secret;
    private static final String AUTHORIZATION = "Authorization";
    private static final String EMAIL = "email";
    private static final String TOKEN_TYPE = "tokenType";
    private static final String USERNAME = "username";

    public String generateAccessToken(String username, TokenType tokenType) {

        return JWT.create()
                .withSubject(AUTHORIZATION)
                .withClaim(USERNAME, username)
                .withClaim(TOKEN_TYPE, tokenType.name())
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public String generateResetToken(String username, TokenType tokenType) {

        return JWT.create()
                .withSubject(AUTHORIZATION)
                .withClaim(USERNAME, username)
                .withClaim(TOKEN_TYPE, tokenType.name())
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public String generateRefreshToken(String username, TokenType tokenType) {
        return JWT.create()
                .withSubject(AUTHORIZATION)
                .withClaim(USERNAME, username)
                .withClaim(TOKEN_TYPE, tokenType.name())
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public String generateActivateToken(String email, TokenType tokenType) {
        return JWT.create()
                .withClaim(EMAIL, email)
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public String getUserEmailFromJwt(String jwt) {
        return JWT.require(Algorithm.HMAC512(secret.getBytes()))
                .build()
                .verify(jwt)
                .getClaim(EMAIL)
                .asString();
    }

    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret.getBytes()))
                    .withSubject(AUTHORIZATION)
                    .build();
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
