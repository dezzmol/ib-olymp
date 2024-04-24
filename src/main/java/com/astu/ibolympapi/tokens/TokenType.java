package com.astu.ibolympapi.tokens;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TokenType {
    //ДОПИСАТЬ ВРЕМЯ ДЛЯ ТОКЕНОВ
    ACCESS_TOKEN(30*60*1000),
    REFRESH_TOKEN(7*24*60*60*1000),
    RESET_PASSWORD_EMAIL(24*60*60*1000);
    private final long tokenExpiration;
}