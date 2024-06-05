package com.astu.ibolympapi.tasks.repository;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.tasks.entities.OlympiadTask;
import com.astu.ibolympapi.tasks.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OlympiadTaskRepo extends JpaRepository<OlympiadTask, Long> {
    Optional<OlympiadTask> getOlympiadTaskByOlympiadAndTask(Olympiad olympiad, Task task);
}
