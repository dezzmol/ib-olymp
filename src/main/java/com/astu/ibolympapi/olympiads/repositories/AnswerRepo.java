package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Answer;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepo extends JpaRepository<Answer, Long> {
    Optional<Answer> findAnswerByOlympiadAndTaskAndTeam(Olympiad olympiad, Task task, Team team);
    Optional<List<Answer>> findAnswerByOlympiad(Olympiad olympiad);
    Optional<List<Answer>> findAnswerByOlympiadAndTask(Olympiad olympiad, Task task);
}
