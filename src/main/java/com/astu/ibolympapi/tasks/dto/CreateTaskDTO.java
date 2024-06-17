package com.astu.ibolympapi.tasks.dto;

import java.io.Serializable;

public record CreateTaskDTO(
        String title,
        String description,
        Long category_id
) implements Serializable {
}
