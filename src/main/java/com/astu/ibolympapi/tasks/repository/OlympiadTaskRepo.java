package com.astu.ibolympapi.tasks.repository;

import com.astu.ibolympapi.tasks.entities.OlympiadTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OlympiadTaskRepo extends JpaRepository<OlympiadTask, Long> {
}
