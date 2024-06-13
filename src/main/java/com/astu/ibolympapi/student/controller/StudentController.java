package com.astu.ibolympapi.student.controller;

import com.astu.ibolympapi.student.dto.StudentDTO;
import com.astu.ibolympapi.student.dto.StudentRegistrationDTO;
import com.astu.ibolympapi.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService service;

    @PostMapping("/")
    public ResponseEntity<String> registration(@RequestBody StudentRegistrationDTO studentRegistrationDTO) {
        service.registration(studentRegistrationDTO);
        return ResponseEntity.ok("Student registered");
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(service.getStudentDTO(studentId));
    }

    @GetMapping("/")
    public ResponseEntity<StudentDTO> getStudentByUser() {
        return ResponseEntity.ok(service.getStudentDTO());
    }

    @GetMapping("/joinTeam/{inviteToken}")
    public ResponseEntity<String> joinTeam(@PathVariable String inviteToken) {
        service.joinTeam(inviteToken);
        return ResponseEntity.ok("Team joined");
    }
}
