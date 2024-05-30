package com.astu.ibolympapi.team.repository;

import com.astu.ibolympapi.team.entity.InviteToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InviteTokenRepo extends JpaRepository<InviteToken, Long> {
    Optional<InviteToken> findByToken(String token);
    void deleteByToken(String token);
}
