package com.astu.ibolympapi.olympiads.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false, foreignKey = @ForeignKey(name = "olympiad_id"))
    private Olympiad olympiad;

    @Column(name = "result_score", precision = 10, scale = 2)
    private BigDecimal resultScore;
}
