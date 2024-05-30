package com.astu.ibolympapi.student.controller;

import com.astu.ibolympapi.student.dto.CreateTeamDTO;
import com.astu.ibolympapi.student.dto.StudentRegistrationDTO;
import com.astu.ibolympapi.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.ap.internal.model.common.PresenceCheck;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService service;

    @PostMapping
    public ResponseEntity<?> registration(@RequestBody StudentRegistrationDTO studentRegistrationDTO) {
        service.registration(studentRegistrationDTO);
        return ResponseEntity.ok("Student registered");
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(service.getStudent(studentId));
    }
}
