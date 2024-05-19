package com.astu.ibolympapi.tokens.repositories;

import com.astu.ibolympapi.tokens.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepo extends JpaRepository<Token, Long> {
    Token findTokenByUserId(Long userId);
}