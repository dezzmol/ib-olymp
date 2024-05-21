package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.tasks.entities.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "OlympiadTaskTeam")
@IdClass(OlympiadTaskTeamId.class)
@RequiredArgsConstructor
@AllArgsConstructor
public class OlympiadTaskTeam {
    @Id
    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false, foreignKey = @ForeignKey(name = "olympiad_id"))
    private Olympiad olympiad;

    @Id
    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, foreignKey = @ForeignKey(name = "task_id"))
    private Task task;

    @Id
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @Column(name = "link_to_answer_file")
    private String link_to_answer_file;

    @Column(name = "result")
    private Integer result;
}
