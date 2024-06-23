package com.astu.ibolympapi.category.dto;

public record CreateCategoryDTO(
        String name,
        String description,
        Integer mark,
        Integer timeForComplete,
        Integer extraPoints
) {
}
