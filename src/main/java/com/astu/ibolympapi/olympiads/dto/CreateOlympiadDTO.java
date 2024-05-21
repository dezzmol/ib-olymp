package com.astu.ibolympapi.olympiads.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record CreateOlympiadDTO(
        String name,
        String description,
        String university,
        LocalDateTime startDate,
        LocalDateTime endDate
) implements Serializable {
}
