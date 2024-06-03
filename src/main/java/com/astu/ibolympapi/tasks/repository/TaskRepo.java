package com.astu.ibolympapi.tasks.repository;

import com.astu.ibolympapi.tasks.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long> {
}
