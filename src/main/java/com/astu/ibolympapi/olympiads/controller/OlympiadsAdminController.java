package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.*;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.team.dto.TeamDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/olympadmin")
@RequiredArgsConstructor
public class OlympiadsAdminController {
    private final OlympiadService service;

    @GetMapping("/{olympiad_id}")
    public ResponseEntity<OlympiadAdminDTO> getAdminOlympiad(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getAdminOlympiad(olympiad_id));
    }

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

    @PostMapping("/{olympiad_id}/addtask/{task_id}")
    public ResponseEntity<String> addTaskToOlympiad(@PathVariable Long olympiad_id, @PathVariable Long task_id) {
        service.addTaskToOlymp(task_id, olympiad_id);
        return ResponseEntity.ok("Task added to olympiad");
    }

    @GetMapping("/{olympiad_id}/tasks")
    public ResponseEntity<List<TaskDTO>> getOlympiadTasks(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadTasksToAdmin(olympiad_id));
    }

    @GetMapping("/{olympiad_id}/members")
    public ResponseEntity<List<TeamDTO>> getOlympiadMembers(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadMembers(olympiad_id));
    }

    @PostMapping("/{olympiad_id}/summarize")
    public ResponseEntity<List<ResultDTO>> summarizeResult(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.summarize(olympiad_id));
    }

    @GetMapping("/{olympiad_id}/summarize")
    public ResponseEntity<List<ResultDTO>> getResult(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getResult(olympiad_id));
    }

    @GetMapping("/{olympiad_id}/summarize/excel/{file_name}")
    public ResponseEntity<Resource> getExcelSummarize(@PathVariable Long olympiad_id, @PathVariable String file_name) throws IOException {
        Resource resource = service.getExcelSummarize(olympiad_id, file_name);
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + file_name + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}
