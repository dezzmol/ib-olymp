package com.astu.ibolympapi.tasks.controller;

import com.astu.ibolympapi.tasks.dto.AttachmentDTO;
import com.astu.ibolympapi.tasks.dto.CreateTaskDTO;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/olympadmin/tasks")
@RequiredArgsConstructor
public class TaskAdminController {
    private final TaskService taskService;

    @GetMapping("/")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskDTO(id));
    }

    @PostMapping("/")
    public ResponseEntity<TaskDTO> createTask(@RequestBody CreateTaskDTO task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @PostMapping(value = "/{taskId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AttachmentDTO> createTaskAttachments(
            @RequestParam(value = "file",required = false) MultipartFile file,
            @PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.createAttachmentForTask(file, taskId));
    }

    @GetMapping("/{task_id}/attachments/{fileName:.+}")
    public ResponseEntity<Resource> getOlympiadAttachment(@PathVariable Long task_id, @PathVariable String fileName) {
        Resource resource = taskService.getAttachment( task_id, fileName);
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}
