package com.astu.ibolympapi.olympiads.dto;

import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.team.dto.TeamDTO;

import java.time.LocalDateTime;
import java.util.List;

public record OlympiadAdminDTO(
        Long id,
        String name,
        String description,
        String university,
        LocalDateTime startDate,
        LocalDateTime endDate,
        List<TeamDTO> members,
        List<TaskDTO> tasks
) {
}
