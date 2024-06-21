package com.astu.ibolympapi.tasks.dto;

import java.io.Serializable;

public record CreateTaskDTO(
        String title,
        String description,
        Long category_id,
        Boolean isTaskForWhile,
        Boolean isDetailedAnswer,
        Integer mark,
        String rightAnswer,
        String complexity
) implements Serializable {
}
