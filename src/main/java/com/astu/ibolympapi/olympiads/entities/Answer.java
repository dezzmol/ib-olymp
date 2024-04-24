package com.astu.ibolympapi.olympiads.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(
                    name = "olympiad_id",
                    referencedColumnName = "olympiad_id",
                    foreignKey = @ForeignKey(name = "olympiad_id")
            ),
            @JoinColumn(
                    name = "task_id",
                    referencedColumnName = "task_id",
                    foreignKey = @ForeignKey(name = "task_id")
            )
    })
    private OlympiadTask olympiadTask;
}
