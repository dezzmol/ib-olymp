package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.entities.OlympiadApplication;
import com.astu.ibolympapi.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OlympiadApplicationRepo extends JpaRepository<OlympiadApplication, Long> {
    List<OlympiadApplication> getOlympiadApplicationByOlympiad(Olympiad olympiad);
    Optional<OlympiadApplication> getOlympiadApplicationByOlympiadAndTeam(Olympiad olympiad, Team team);
}
