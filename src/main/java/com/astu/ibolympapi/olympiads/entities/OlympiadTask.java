package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.tasks.entities.Task;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "olympiad_tasks")
public class OlympiadTask {
    @Id
    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false, foreignKey = @ForeignKey(name = "olympiad_id"))
    private Olympiad olympiad;

    @Id
    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, foreignKey = @ForeignKey(name = "task_id"))
    private Task task;
}
