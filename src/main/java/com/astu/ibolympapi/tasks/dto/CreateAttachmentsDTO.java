package com.astu.ibolympapi.tasks.dto;

import java.io.Serializable;

public record CreateAttachmentsDTO(
        String name,
        Long taskId
) implements Serializable {
}
