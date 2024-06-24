package com.astu.ibolympapi.estimate.service;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.estimate.dto.RateSolutionDTO;
import com.astu.ibolympapi.estimate.entity.Result;
import com.astu.ibolympapi.estimate.repository.ResultRepo;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.entities.Answer;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.mapper.AnswerMapper;
import com.astu.ibolympapi.olympiads.repositories.AnswerRepo;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.service.StudentService;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.service.TaskService;
import com.astu.ibolympapi.team.entity.Team;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {
    private final OlympiadService olympiadService;
    private final AnswerRepo answerRepo;
    private final AnswerMapper answerMapper;
    private final TaskService taskService;
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

    public void summarize(Long olymp_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

        List<Answer> answers = answerRepo.findAnswerByOlympiad(olympiad)
                .orElseThrow(() -> new BadRequestException(ErrorCode.ANSWER_NOT_FOUND));

        setFinalMarkForAnswers(answers, olympiad);
        List<Result> results = setResults(answers, olympiad);


    }

    private void setFinalMarkForAnswers(List<Answer> answers, Olympiad olympiad) {
        int N = olympiad.getTeams().size();
        for (Task task : olympiad.getTasks()) {
            int Ns = 0;
            for (Answer answer : answers) {
                if (answer.getTask() == task) {
                    if (Objects.equals(answer.getAns(), task.getRightAnswer())) {
                        Ns++;
                    }
                }
            }

            double q = task.getMark() + task.getCategory().getMark();
            double B = q / (1 + (double) Ns / N);

            for (Answer answer : answers) {
                if (answer.getTask() == task) {
                    answer.setFinalMark(B);
                }
            }
        }
    }

    private List<Result> setResults(List<Answer> answers, Olympiad olympiad) {
        List<Result> results = new ArrayList<>(olympiad.getTeams().size());

        for (Team team : olympiad.getTeams()) {
            double score = 0;
            for (Answer answer : answers) {
                if (team == answer.getTeam()) {
                    if (Objects.equals(answer.getAns(), answer.getTask().getRightAnswer())) {
                        score += answer.getFinalMark();

                        if (answer.getIsCreativeSolution()) {

                        }

                        Duration duration = Duration.between(answer.getStartTime(), answer.getEndTime());
                        long minutes = duration.toMinutes();

                        if (minutes < answer.getTask().getCategory().getTime()) {
                            score += answer.getTask().getCategory().getExtraPoints();
                        }

                    }

                }
            }

            Result result = Result.builder()
                    .team(team)
                    .resultScore(BigDecimal.valueOf(score))
                    .olympiad(olympiad)
                    .build();

            results.add(result);
        }

        resultRepo.saveAll(results);
        return results;
    }
}
