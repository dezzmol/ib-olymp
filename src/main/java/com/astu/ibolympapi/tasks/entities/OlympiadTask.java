package com.astu.ibolympapi.tasks.entities;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "olympiad_tasks")
@IdClass(OlympiadTaskId.class)
@RequiredArgsConstructor
@AllArgsConstructor
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
