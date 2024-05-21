package com.astu.ibolympapi.olympiads.mapper;

import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OlympiadMapper {
    OlympiadDTO toOlympiadDTO(Olympiad olympiad);
}
