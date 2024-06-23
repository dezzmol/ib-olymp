package com.astu.ibolympapi.olympiads.mapper;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.olympiads.entities.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    List<AnswerDTO> toAnswerDTOs(List<Answer> answers);
}
