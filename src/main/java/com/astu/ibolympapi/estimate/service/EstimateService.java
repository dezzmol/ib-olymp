package com.astu.ibolympapi.estimate.service;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.estimate.dto.RateSolutionDTO;
import com.astu.ibolympapi.estimate.repository.ResultRepo;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.entities.Answer;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.mapper.AnswerMapper;
import com.astu.ibolympapi.olympiads.repositories.AnswerRepo;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.mapper.TaskMapper;
import com.astu.ibolympapi.tasks.service.TaskService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {
    private final OlympiadService olympiadService;
    private final AnswerRepo answerRepo;
    private final AnswerMapper answerMapper;
    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final ResultRepo resultRepo;
    @Value("${file.upload-dir}")
    private String fileUploadDir;

    public List<AnswerDTO> getAnswers(Long olymp_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

        List<Answer> answers = answerRepo.findAnswerByOlympiad(olympiad)
                .orElse(null);

        return answerMapper.toAnswerDTOs(answers);
    }

    public List<AnswerDTO> getAnswersByOlympiadAndTask(Long olymp_id, Long task_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);
        Task task = taskService.getTaskById(task_id);

        List<Answer> answers = answerRepo.findAnswerByOlympiadAndTask(olympiad, task)
                .orElse(null);

        return answerMapper.toAnswerDTOs(answers);
    }

    public Resource getFile(Long olymp_id, Long task_id, String fileName) {
        try {
            Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

            Path file = Path.of(fileUploadDir).resolve("solutions").resolve("task_" + task_id).resolve(fileName);
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

    public void rateSolution(Long olympiad_id, Long solution_id, RateSolutionDTO rateSolutionDTO) {
        Olympiad olympiad = olympiadService.getOlympiad(olympiad_id);

        Answer answer = answerRepo.findById(solution_id)
                .orElseThrow(() -> new BadRequestException(ErrorCode.ANSWER_NOT_FOUND));

        answer.setIsChecked(true);
        answer.setIsCreativeSolution(rateSolutionDTO.isCreativeSolution());

        answerRepo.save(answer);
    }

    public List<TaskDTO> getOlympiadTasks(Long olymp_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

        return taskMapper.tasksToTaskDTOs(olympiad.getTasks());
    }

    public TaskDTO getTask(Long olymp_id, Long task_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

        return taskService.getTaskDTO(task_id);
    }
}
