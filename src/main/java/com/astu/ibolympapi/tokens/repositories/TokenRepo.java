package com.astu.ibolympapi.tokens.repositories;

import com.astu.ibolympapi.tokens.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Long> {
    Optional<Token> findTokenByUserId(Long userId);
}