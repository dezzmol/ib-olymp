package com.astu.ibolympapi.student.mapper;

import com.astu.ibolympapi.student.dto.StudentDTO;
import com.astu.ibolympapi.student.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentDTO toStudentDTO(Student student);
}
