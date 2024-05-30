package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.team.entity.Team;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@Table(name = "olympiad_applications")
@IdClass(OlympiadApplicationId.class)
@RequiredArgsConstructor
@AllArgsConstructor
public class OlympiadApplication {
    @Id
    @ManyToOne
    @JoinColumn(name = "olympiad_id", nullable = false)
    private Olympiad olympiad;

    @Id
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;
}