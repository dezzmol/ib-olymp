package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/olymp/")
@RequiredArgsConstructor
public class OlympiadController {
    private final OlympiadService service;

    @GetMapping("/{olympiad_id}")
    public ResponseEntity<OlympiadDTO> getOlympiadById(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadDTO(olympiad_id));
    }

    @PostMapping("/{olympiad_id}/registration")
    public ResponseEntity<String> registerOnOlympiad(@PathVariable Long olympiad_id) {
        service.registrationOnOlympiad(olympiad_id);
        return ResponseEntity.ok("Registration on olympiad successful");
    }

    @GetMapping("/{olympiad_id}/tasks/{task_id}")
    public ResponseEntity<TaskDTO> getOlympiadTask(@PathVariable Long olympiad_id, @PathVariable Long task_id) {
        return ResponseEntity.ok(service.getOlympiadTask(olympiad_id, task_id));
    }
}
