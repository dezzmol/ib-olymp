package com.astu.ibolympapi.olympiads.mapper;

import com.astu.ibolympapi.olympiads.dto.OlympiadAdminDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OlympiadMapper {
    OlympiadDTO toOlympiadDTO(Olympiad olympiad);
    List<OlympiadDTO> toOlympiadDTOs(List<Olympiad> olympiads);
    OlympiadAdminDTO toOlympiadAdminDTO(Olympiad olympiad);
}
