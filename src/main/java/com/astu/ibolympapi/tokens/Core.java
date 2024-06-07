package com.astu.ibolympapi.tokens;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.tokens.entities.Token;
import com.astu.ibolympapi.tokens.repositories.TokenRepo;
import com.astu.ibolympapi.user.entities.User;
import com.astu.ibolympapi.user.services.UserService;
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
    private final TokenRepo tokenRepo;
    private final UserService userService;

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
        String token = JWT.create()
                .withSubject(AUTHORIZATION)
                .withClaim(USERNAME, username)
                .withClaim(TOKEN_TYPE, tokenType.name())
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ErrorCode.USER_NOT_FOUND));

        Token tokenEntity;
        if (tokenRepo.findTokenByUserId(user.getId()).isEmpty()) {
            tokenEntity = Token.builder()
                    .token(token)
                    .user(user)
                    .build();
        } else {
            tokenEntity = tokenRepo.findTokenByUserId(user.getId())
                    .orElseThrow(() -> new BadRequestException(ErrorCode.TOKEN_NOT_FOUND));

            tokenEntity.setToken(token);
        }

        tokenRepo.save(tokenEntity);

        return token;
    }

    public String generateActivateToken(String username, TokenType tokenType) {
        return JWT.create()
                .withClaim(USERNAME, username)
                .withExpiresAt(new java.util.Date(System.currentTimeMillis() + tokenType.getTokenExpiration()))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public String getUsernameFromJwt(String jwt) {
        return JWT.require(Algorithm.HMAC512(secret.getBytes()))
                .build()
                .verify(jwt)
                .getClaim(USERNAME)
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
