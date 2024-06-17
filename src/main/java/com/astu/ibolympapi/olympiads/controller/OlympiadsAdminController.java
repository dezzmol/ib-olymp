package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.CreateOlympiadDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadApplicationsDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.AddTaskToOlympDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/olympadmin")
@RequiredArgsConstructor
public class OlympiadsAdminController {
    private final OlympiadService service;

    @PostMapping("/")
    public ResponseEntity<OlympiadDTO> createOlympiad(@RequestBody CreateOlympiadDTO createOlympiadDTO) {
        return ResponseEntity.ok(service.createOlympiad(createOlympiadDTO));
    }

    @GetMapping("/{olympiad_id}/applications")
    public ResponseEntity<OlympiadApplicationsDTO> getOlympiadApplications(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadApplications(olympiad_id));
    }

    @PostMapping("/{olympiad_id}/accept/{team_id}")
    public ResponseEntity<String> acceptTeam(@PathVariable Long olympiad_id, @PathVariable Long team_id) {
        service.acceptTeam(olympiad_id, team_id);
        return ResponseEntity.ok("Team accepted");
    }

    @PostMapping("/addtask")
    public ResponseEntity<String> addTaskToOlympiad(@RequestBody AddTaskToOlympDTO addTaskToOlympDTO) {
        service.addTaskToOlymp(addTaskToOlympDTO.taksId(), addTaskToOlympDTO.olympId());
        return ResponseEntity.ok("Task added to olympiad");
    }
}
