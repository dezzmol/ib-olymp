package com.astu.ibolympapi.olympiads.dto;

import java.io.Serializable;

public record IsTaskOpenDTO(
        Boolean isTaskOpen,
        Boolean isAnswerUploaded
) implements Serializable {
}
