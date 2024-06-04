package com.astu.ibolympapi.olympiads.dto;

import com.astu.ibolympapi.team.dto.TeamDTO;

import java.util.List;

public record OlympiadApplicationsDTO(
        OlympiadDTO olympiad,
        List<TeamDTO> teams
) {
}
