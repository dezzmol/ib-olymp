package com.astu.ibolympapi.user.dto;

import java.io.Serializable;

public record UserDTO(
        Long id,
        String username,
        String name,
        String surname,
        String patronymic,
        String email
) implements Serializable {
}
