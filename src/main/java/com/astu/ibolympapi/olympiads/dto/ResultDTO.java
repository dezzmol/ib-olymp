package com.astu.ibolympapi.olympiads.dto;

import com.astu.ibolympapi.team.dto.TeamDTO;

import java.io.Serializable;

public record ResultDTO(
        Long id,
        OlympiadDTO olympiad,
        TeamDTO team,
        Double resultScore,
        Integer finalPlace
) implements Serializable {
}
