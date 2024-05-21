package com.astu.ibolympapi.olympiads.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record OlympiadDTO(
        Long id,
        String name,
        String description,
        String university,
        LocalDateTime startDate,
        LocalDateTime endDate
) implements Serializable {
}
