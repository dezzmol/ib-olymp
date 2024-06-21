package com.astu.ibolympapi.tasks.service;

import com.astu.ibolympapi.category.entity.Category;
import com.astu.ibolympapi.category.service.CategoryService;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.tasks.dto.AttachmentDTO;
import com.astu.ibolympapi.tasks.dto.CreateTaskDTO;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.mapper.AttachmentsMapper;
import com.astu.ibolympapi.tasks.mapper.TaskMapper;
import com.astu.ibolympapi.tasks.repository.AttachmentsRepo;
import com.astu.ibolympapi.tasks.repository.TaskRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("application.properties")
public class TaskService {
    private final TaskRepo repo;
    private final CategoryService categoryService;
    private final AttachmentsRepo attachmentsRepo;
    private final AttachmentsMapper attachmentsMapper;
    private final TaskMapper taskMapper;
    @Value("${file.upload-dir}")
    private String fileUploadDir;

    public TaskDTO createTask(CreateTaskDTO taskDTO) {
        Category category = categoryService.getCategory(taskDTO.category_id());

        Task task = Task.builder()
                .category(category)
                .title(taskDTO.title())
                .description(taskDTO.description())
                .isTaskForWhile(taskDTO.isTaskForWhile())
                .isDetailedAnswer(taskDTO.isDetailedAnswer())
                .rightAnswer(taskDTO.rightAnswer())
                .complexity(taskDTO.complexity())
                .mark(taskDTO.mark())
                .build();

        return taskMapper.taskToTaskDTO(repo.save(task));
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElseThrow(() -> new BadRequestException(ErrorCode.TASK_NOT_FOUND));
    }

    public TaskDTO getTaskDTO(Long id) {
        return taskMapper.taskToTaskDTO(getTaskById(id));
    }

    public AttachmentDTO createAttachmentForTask(MultipartFile file, Long taskId) {
        System.out.println(file);
        Task task = getTaskById(taskId);
        String fileName = file.getOriginalFilename();

        try {
            if (fileName.contains("..")) {
                throw new BadRequestException(HttpStatusCode.valueOf(400), "Filename contains invalid path sequence " + fileName);
            }

            Path taskDir = Path.of(fileUploadDir).resolve("task_" + taskId);
            if (!Files.exists(taskDir)) {
                Files.createDirectories(taskDir);
            }

            Path targetLocation = taskDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            AttachmentForTask attachmentForTask = AttachmentForTask.builder()
                    .task(task)
                    .name(fileName)
                    .pathToFile(targetLocation.toString())
                    .build();

            return attachmentsMapper.toAttachmentDTO(attachmentsRepo.save(attachmentForTask));

        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new BadRequestException(HttpStatusCode.valueOf(400), e.getMessage());
        }
    }

    public List<TaskDTO> getTasks() {
        return taskMapper.tasksToTaskDTOs(repo.findAll());
    }

    public Resource getAttachment(Long task_id, String filename) {
        try {
            Path file = Path.of(fileUploadDir).resolve("task_" + task_id).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new BadRequestException(HttpStatusCode.valueOf(400), "Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new BadRequestException(HttpStatusCode.valueOf(400), "Error: " + e.getMessage());
        }
    }
}
