package com.astu.ibolympapi.student.dto;

import java.io.Serializable;

public record StudentRegistrationDTO(
        int age,
        String phoneNumber,
        String university,
        String otherContactsData
) implements Serializable {
}
