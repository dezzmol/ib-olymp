package com.astu.ibolympapi.admin.service;

import com.astu.ibolympapi.student.dto.StudentDTO;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final StudentService studentService;

    public StudentDTO getStudent(Long id) {
        return studentService.getStudent(id);
    }
}
