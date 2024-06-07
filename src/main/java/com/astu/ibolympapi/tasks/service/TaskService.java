package com.astu.ibolympapi.tasks.service;

import com.astu.ibolympapi.category.service.CategoryService;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.CreateAttachmentsDTO;
import com.astu.ibolympapi.tasks.dto.CreateTaskDTO;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import com.astu.ibolympapi.category.entity.Category;
import com.astu.ibolympapi.tasks.entities.OlympiadTask;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.mapper.TaskMapper;
import com.astu.ibolympapi.tasks.repository.AttachmentsRepo;
import com.astu.ibolympapi.tasks.repository.OlympiadTaskRepo;
import com.astu.ibolympapi.tasks.repository.TaskRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("application.properties")
public class TaskService {
    private final TaskRepo repo;
    private final CategoryService categoryService;
    private final AttachmentsRepo attachmentsRepo;
    private final TaskMapper taskMapper;
    @Value("${file.upload-dir}")
    private String fileUploadDir;

    public TaskDTO createTask(CreateTaskDTO taskDTO) {
        Category category = categoryService.getCategory(taskDTO.category_id());

        Task task = Task.builder()
                .category(category)
                .title(taskDTO.title())
                .description(taskDTO.description())
                .isOpen(false)
                .build();

        return taskMapper.taskToTaskDTO(repo.save(task));
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElseThrow(() -> new BadRequestException(ErrorCode.TASK_NOT_FOUND));
    }

    public TaskDTO getTaskDTO(Long id) {
        return taskMapper.taskToTaskDTO(getTaskById(id));
    }

    public AttachmentForTask createAttachmentForTask(MultipartFile file, CreateAttachmentsDTO createAttachmentsDTO) {
        Task task = getTaskById(createAttachmentsDTO.taskId());
        String fileName = file.getOriginalFilename();

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Filename contains invalid path sequence " + fileName);
            }

            Path taskDir = Path.of(fileUploadDir).resolve("task_" + createAttachmentsDTO.taskId());
            if (!Files.exists(taskDir)) {
                Files.createDirectories(taskDir);
            }

            Path targetLocation = taskDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            AttachmentForTask attachmentForTask = AttachmentForTask.builder()
                    .task(task)
                    .name(createAttachmentsDTO.name())
                    .pathToFile(targetLocation.toString())
                    .build();

            return attachmentsRepo.save(attachmentForTask);

        } catch (IOException e) {
            throw new BadRequestException(ErrorCode.COUlD_NOT_STORE_FILE);
        }
    }


}
