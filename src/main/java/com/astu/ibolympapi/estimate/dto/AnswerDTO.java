package com.astu.ibolympapi.estimate.dto;

import com.astu.ibolympapi.tasks.dto.TaskDTO;

import java.io.Serializable;
import java.time.LocalDateTime;

public record AnswerDTO(
        Long id,
        LocalDateTime startTime,
        LocalDateTime endTime,
        TaskDTO taskDTO,
        String filePath,
        String ans
) implements Serializable {
}
