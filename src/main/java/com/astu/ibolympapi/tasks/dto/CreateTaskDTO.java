package com.astu.ibolympapi.tasks.dto;

public record CreateTaskDTO(
        String title,
        String description,
        Long category_id
) {
}
