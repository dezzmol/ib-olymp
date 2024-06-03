package com.astu.ibolympapi.tasks.controller;

import com.astu.ibolympapi.tasks.dto.CreateAttachmentsDTO;
import com.astu.ibolympapi.tasks.dto.CreateTaskDTO;
import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/olympadmin/tasks")
@RequiredArgsConstructor
public class TaskAdminController {
    private final TaskService taskService;

    @PostMapping("/")
    public ResponseEntity<Task> createTask(@RequestBody CreateTaskDTO task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @PostMapping("/attachments")
    public ResponseEntity<AttachmentForTask> createTaskAttachments(
            @RequestParam("file") MultipartFile file,
            @RequestBody CreateAttachmentsDTO createAttachmentsDTO) {
        return ResponseEntity.ok(taskService.createAttachmentForTask(file, createAttachmentsDTO));
    }
}
