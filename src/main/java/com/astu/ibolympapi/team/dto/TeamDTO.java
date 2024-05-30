package com.astu.ibolympapi.team.dto;

import com.astu.ibolympapi.student.dto.StudentDTO;

import java.io.Serializable;
import java.util.List;

public record TeamDTO(
        Long id,
        String name,
        List<StudentDTO> students
) implements Serializable {
}
