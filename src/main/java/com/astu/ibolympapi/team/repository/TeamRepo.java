package com.astu.ibolympapi.team.repository;

import com.astu.ibolympapi.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepo extends JpaRepository<Team, Long> {
}
