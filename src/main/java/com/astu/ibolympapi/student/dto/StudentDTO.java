package com.astu.ibolympapi.student.dto;

import com.astu.ibolympapi.user.dto.UserDTO;

import java.io.Serializable;

public record StudentDTO(
        Long id,
        UserDTO user,
        int age,
        String phoneNumber,
        String university,
        Boolean isCaptain,
        String otherContactsData
) implements Serializable {
}
