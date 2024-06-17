package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.team.entity.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "olympiad_teams")
@IdClass(OlympiadTeamsId.class)
@RequiredArgsConstructor
@AllArgsConstructor
public class OlympiadTeams {
    @Id
    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false)
    private Olympiad olympiad;

    @Id
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;
}
