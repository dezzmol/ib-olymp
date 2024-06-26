package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.team.entity.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "results")
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false, foreignKey = @ForeignKey(name = "olympiad_id"))
    private Olympiad olympiad;

    @Column(name = "result_score", precision = 10, scale = 2)
    private BigDecimal resultScore;
}
