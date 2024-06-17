package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.entities.OlympiadTeams;
import com.astu.ibolympapi.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OlympiadTeamsRepo extends JpaRepository<OlympiadTeams, Long> {
    Optional<OlympiadTeams> findOlympiadTeamsByOlympiadAndTeam(Olympiad olympiad, Team team);
}
