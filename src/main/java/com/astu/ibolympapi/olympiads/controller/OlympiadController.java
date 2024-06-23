package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.IsTaskOpenDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.SolutionDTO;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/olymp/")
@RequiredArgsConstructor
public class OlympiadController {
    private final OlympiadService service;

    @GetMapping("/{olympiad_id}")
    public ResponseEntity<OlympiadDTO> getOlympiadById(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadDTO(olympiad_id));
    }

    @GetMapping("/")
    public ResponseEntity<List<OlympiadDTO>> getAllOlympiads() {
        return ResponseEntity.ok(service.getAllOlympiadDTO());
    }

    @GetMapping("/{olymp_id}/tasks/{task_id}/attachments/{fileName:.+}")
    public ResponseEntity<Resource> getOlympiadAttachment(@PathVariable Long olymp_id, @PathVariable Long task_id, @PathVariable String fileName) {
        Resource resource = service.getAttachment(olymp_id, task_id, fileName);
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    @PostMapping("/{olympiad_id}/registration")
    public ResponseEntity<String> registerOnOlympiad(@PathVariable Long olympiad_id) {
        service.registrationOnOlympiad(olympiad_id);
        return ResponseEntity.ok("Registration on olympiad successful");
    }

    @GetMapping("/{olympiad_id}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByOlympiad(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiadTasks(olympiad_id));
    }

    @GetMapping("/{olympiad_id}/tasks/{task_id}")
    public ResponseEntity<TaskDTO> getOlympiadTask(@PathVariable Long olympiad_id, @PathVariable Long task_id) {
        return ResponseEntity.ok(service.getOlympiadTask(olympiad_id, task_id));
    }

    @GetMapping("/{olympiad_id}/tasks/{task_id}/check")
    public ResponseEntity<IsTaskOpenDTO> checkIsTaskOpened(@PathVariable Long olympiad_id, @PathVariable Long task_id) {
        return ResponseEntity.ok(service.checkIsTaskOpened(olympiad_id, task_id));
    }

    @PostMapping("/{olympiad_id}/tasks/{task_id}/open")
    public ResponseEntity<String> openTask(@PathVariable Long olympiad_id, @PathVariable Long task_id) {
        service.openTask(olympiad_id, task_id);
        return ResponseEntity.ok("Task opened");
    }

    @PostMapping("/{olympiad_id}/tasks/{task_id}/uploadSolution")
    public ResponseEntity<String> uploadSolutionWithFile(
            @RequestParam(value = "file",required = false) MultipartFile file,
            @PathVariable Long olympiad_id,
            @PathVariable Long task_id
    ) {
        service.uploadSolutionWithFile(file, olympiad_id, task_id);
        return ResponseEntity.ok("Solution with file accepted");
    }

    @PostMapping("/{olympiad_id}/tasks/{task_id}/solution")
    public ResponseEntity<String> uploadSolution(@PathVariable Long olympiad_id, @PathVariable Long task_id, @RequestBody SolutionDTO solutionDTO) {
        service.uploadSolution(olympiad_id, task_id, solutionDTO);
        return ResponseEntity.ok("Solution accepted");
    }

    @GetMapping("/myolympiads")
    public ResponseEntity<List<OlympiadDTO>> getMyOlympiads() {
        return ResponseEntity.ok(service.getMyOlympiads());
    }
}
