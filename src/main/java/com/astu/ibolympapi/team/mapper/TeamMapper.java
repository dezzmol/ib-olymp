package com.astu.ibolympapi.team.mapper;

import com.astu.ibolympapi.team.dto.TeamDTO;
import com.astu.ibolympapi.team.entity.Team;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    TeamDTO toTeamDTO(Team team);
}
