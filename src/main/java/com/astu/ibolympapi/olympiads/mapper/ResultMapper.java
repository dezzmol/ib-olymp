package com.astu.ibolympapi.olympiads.mapper;

import com.astu.ibolympapi.olympiads.entities.Result;
import com.astu.ibolympapi.olympiads.dto.ResultDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResultMapper {
    List<ResultDTO> toResultDTOs(List<Result> results);
}
