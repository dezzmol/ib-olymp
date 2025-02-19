package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.team.entity.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "answers")
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false, foreignKey = @ForeignKey(name = "olympiad_id"))
    private Olympiad olympiad;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, foreignKey = @ForeignKey(name = "task_id"))
    private Task task;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "ans")
    private String ans;

    @Column(name = "final_mark")
    private Double finalMark;

    @Column(name = "is_checked")
    private Boolean isChecked;

    @Column(name = "is_creative_solution")
    private Boolean isCreativeSolution;

    @Column(name = "creativity_rate", precision = 2, scale = 1)
    private BigDecimal creativeRate;
}
