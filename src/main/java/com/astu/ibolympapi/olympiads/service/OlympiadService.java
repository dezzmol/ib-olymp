package com.astu.ibolympapi.olympiads.service;

import com.astu.ibolympapi.olympiads.entities.Result;
import com.astu.ibolympapi.olympiads.mapper.AnswerMapper;
import com.astu.ibolympapi.olympiads.repositories.ResultRepo;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.dto.*;
import com.astu.ibolympapi.olympiads.entities.Answer;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.entities.OlympiadApplication;
import com.astu.ibolympapi.olympiads.entities.OlympiadTeams;
import com.astu.ibolympapi.olympiads.mapper.OlympiadMapper;
import com.astu.ibolympapi.olympiads.mapper.ResultMapper;
import com.astu.ibolympapi.olympiads.repositories.AnswerRepo;
import com.astu.ibolympapi.olympiads.repositories.OlympiadApplicationRepo;
import com.astu.ibolympapi.olympiads.repositories.OlympiadRepo;
import com.astu.ibolympapi.olympiads.repositories.OlympiadTeamsRepo;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.service.StudentService;
import com.astu.ibolympapi.tasks.dto.SolutionDTO;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.OlympiadTask;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.mapper.TaskMapper;
import com.astu.ibolympapi.tasks.repository.OlympiadTaskRepo;
import com.astu.ibolympapi.tasks.service.TaskService;
import com.astu.ibolympapi.team.dto.TeamDTO;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.team.mapper.TeamMapper;
import com.astu.ibolympapi.team.service.TeamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class OlympiadService {
    private final OlympiadRepo olympiadRepo;
    private final OlympiadMapper olympiadMapper;
    private final StudentService studentService;
    private final OlympiadApplicationRepo olympiadApplicationRepo;
    private final TeamMapper teamMapper;
    private final OlympiadTaskRepo olympiadTaskRepo;
    private final OlympiadTeamsRepo olympiadTeamsRepo;
    private final AnswerRepo answerRepo;
    private final AnswerMapper answerMapper;
    private final TaskService taskService;
    private final TeamService teamService;
    private final TaskMapper taskMapper;
    private final ResultRepo resultRepo;
    private final ResultMapper resultMapper;
    @Value("${file.upload-dir}")
    private String fileUploadDir;

    public OlympiadDTO createOlympiad(CreateOlympiadDTO newOlympiad) {
        Olympiad olympiad = Olympiad.builder()
                .name(newOlympiad.name())
                .description(newOlympiad.description())
                .university(newOlympiad.university())
                .startDate(newOlympiad.startDate())
                .endDate(newOlympiad.endDate())
                .teams(new ArrayList<>())
                .tasks(new ArrayList<>())
                .build();

        olympiadRepo.save(olympiad);
        return olympiadMapper.toOlympiadDTO(olympiad);
    }

    public OlympiadAdminDTO getAdminOlympiad(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);

        return olympiadMapper.toOlympiadAdminDTO(olympiad);
    }

    public List<OlympiadDTO> getAllOlympiadDTO() {
        return olympiadMapper.toOlympiadDTOs(olympiadRepo.findAll());
    }

    public Olympiad getOlympiad(Long id) {
        return olympiadRepo.findById(id)
                .orElseThrow(() -> new BadRequestException(ErrorCode.OLYMPIAD_NOT_FOUND));
    }

    public OlympiadDTO getOlympiadDTO(Long id) {
        Olympiad olympiad = olympiadRepo.findById(id)
                .orElseThrow(() -> new BadRequestException(ErrorCode.OLYMPIAD_NOT_FOUND));

        return olympiadMapper.toOlympiadDTO(olympiad);
    }

    public void registrationOnOlympiad(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        LocalDateTime localDateTime = LocalDateTime.now();
//        if (localDateTime.isAfter(olympiad.getStartDate())) {
//            throw new BadRequestException(ErrorCode.REGISTRATION_TIME_HAS_ENDED);
//        }

        Student student = studentService.getStudentByAuthUser();

        if (student.getTeam() == null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        if (!student.getIsCaptain()) {
            throw new BadRequestException(ErrorCode.STUDENT_IS_NOT_CAPTAIN);
        }

        Team team = student.getTeam();

        OlympiadApplication olympiadApplication = OlympiadApplication.builder()
                .olympiad(olympiad)
                .team(team)
                .build();

        olympiadApplicationRepo.save(olympiadApplication);
    }

    public Resource getAttachment(Long olympiad_id, Long task_id, String filename) {
        try {
            Olympiad olympiad = getOlympiad(olympiad_id);
            Student student = studentService.getStudentByAuthUser();
            Team team = student.getTeam();

            if (!olympiad.getTeams().contains(team)) {
                throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
            }

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

    public OlympiadApplicationsDTO getOlympiadApplications(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);

        List<OlympiadApplication> olympiadApplications = olympiadApplicationRepo.getOlympiadApplicationByOlympiad(olympiad);
        List<Team> teams = new ArrayList<>();

        for (OlympiadApplication application : olympiadApplications) {
            teams.add(application.getTeam());
        }

        return new OlympiadApplicationsDTO(olympiadMapper.toOlympiadDTO(olympiad), teamMapper.toTeamDTOs(teams));
    }

    public List<TaskDTO> getOlympiadTasks(Long olympiad_id) {
        Student student = studentService.getStudentByAuthUser();

        Team team = student.getTeam();

        Olympiad olympiad = getOlympiad(olympiad_id);
        if (!olympiad.getTeams().contains(team)) {
            throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
        }
        return taskMapper.tasksToTaskDTOs(olympiad.getTasks());
    }

    public List<TaskDTO> getOlympiadTasksToAdmin(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);

        return taskMapper.tasksToTaskDTOs(olympiad.getTasks());
    }

    public TaskDTO getOlympiadTask(Long olympiad_id, Long task_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Task task = taskService.getTaskById(task_id);

        OlympiadTask olympiadTask = olympiadTaskRepo.getOlympiadTaskByOlympiadAndTask(olympiad, task)
                .orElseThrow(() -> new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD));

        return taskService.getTaskDTO(olympiadTask.getTask().getId());
    }

    public void addTaskToOlymp(Long taskId, Long olympId) {
        Task task = taskService.getTaskById(taskId);
        Olympiad olympiad = getOlympiad(olympId);

        if (olympiad.getTasks().contains(task)) {
            throw new BadRequestException(ErrorCode.TASK_IS_ALREADY_IN_OLYMPIAD);
        }

        OlympiadTask olympiadTask = OlympiadTask.builder()
                .task(task)
                .olympiad(olympiad)
                .build();

        olympiadTaskRepo.save(olympiadTask);
    }

    public void acceptTeam(Long olympiad_id, Long team_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Team team = teamService.getTeam(team_id);

        OlympiadApplication olympiadApplication = olympiadApplicationRepo.getOlympiadApplicationByOlympiadAndTeam(olympiad, team)
                .orElseThrow(() -> new BadRequestException(ErrorCode.APPLICATION_IS_NOT_EXIST));

        Optional<OlympiadTeams> olympiadTeams = olympiadTeamsRepo.findOlympiadTeamsByOlympiadAndTeam(olympiad, team);

        if (olympiadTeams.isPresent()) {
            throw new BadRequestException(ErrorCode.TEAM_ALREADY_REGISTERED_ON_OLYMPIAD);
        }

        olympiadApplicationRepo.delete(olympiadApplication);

        OlympiadTeams newOlympiadTeams = OlympiadTeams.builder()
                .olympiad(olympiad)
                .team(team)
                .build();

        olympiadTeamsRepo.save(newOlympiadTeams);
    }

    public List<OlympiadDTO> getMyOlympiads() {
        Student student = studentService.getStudentByAuthUser();
        Team team = student.getTeam();

        List<OlympiadTeams> olympiadTeams = olympiadTeamsRepo.findOlympiadTeamsByTeam(team)
                .orElse(null);

        if (olympiadTeams == null) {
            return null;
        }
        List<OlympiadDTO> olympiadDTOS = new ArrayList<>();
        for (OlympiadTeams teams : olympiadTeams) {
            olympiadDTOS.add(olympiadMapper.toOlympiadDTO(teams.getOlympiad()));
        }

        return olympiadDTOS;
    }

    public List<TeamDTO> getOlympiadMembers(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);

        return teamMapper.toTeamDTOs(olympiad.getTeams());
    }

    public IsTaskOpenDTO checkIsTaskOpened(Long olympId, Long taskId) {
        Olympiad olympiad = getOlympiad(olympId);
        Student student = studentService.getStudentByAuthUser();
        Team team = student.getTeam();
        if (!olympiad.getTeams().contains(team)) {
            throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
        }

        Task task = taskService.getTaskById(taskId);
        if (!olympiad.getTasks().contains(task)) {
            throw new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD);
        }

        Answer answer = answerRepo.findAnswerByOlympiadAndTaskAndTeam(olympiad, task, team)
                .orElse(null);

        boolean isAnswerUploaded = answer != null && answer.getAns() != null;

        return new IsTaskOpenDTO(answer != null, isAnswerUploaded);
    }

    public void openTask(Long olympiad_id, Long task_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Student student = studentService.getStudentByAuthUser();
        Team team = student.getTeam();

        if (!olympiad.getTeams().contains(team)) {
            throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
        }

        Task task = taskService.getTaskById(task_id);
        if (!olympiad.getTasks().contains(task)) {
            throw new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD);
        }
        OlympiadTask olympiadTask = new OlympiadTask(olympiad, task);

        if (answerRepo.findAnswerByOlympiadAndTaskAndTeam(olympiad, task, team).isEmpty()) {
            LocalDateTime localDateTime = LocalDateTime.now();
            Answer answer = Answer.builder()
                    .ans(null)
                    .startTime(localDateTime)
                    .endTime(null)
                    .fileName(null)
                    .isChecked(false)
                    .isCreativeSolution(false)
                    .finalMark((double) 0)
                    .olympiad(olympiad)
                    .task(task)
                    .team(team)
                    .build();

            answerRepo.save(answer);
        }
    }

    public void uploadSolutionWithFile(MultipartFile file, Long olympiad_id, Long task_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Student student = studentService.getStudentByAuthUser();
        Team team = student.getTeam();

        if (!olympiad.getTeams().contains(team)) {
            throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
        }

        Task task = taskService.getTaskById(task_id);
        if (!olympiad.getTasks().contains(task)) {
            throw new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD);
        }

        if (!task.getIsDetailedAnswer()) {
            throw new BadRequestException(ErrorCode.TASK_DOES_NOT_NEED_DETAILED_ANSWER);
        }

        Answer answer = answerRepo.findAnswerByOlympiadAndTaskAndTeam(olympiad, task, team)
                .orElseThrow(() -> new BadRequestException(ErrorCode.ANSWER_NOT_FOUND));

        if (answer.getFileName() != null || answer.getEndTime() != null) {
            throw new BadRequestException(ErrorCode.ANSWER_IS_ALREADY_ACCEPTED);
        }

        LocalDateTime localDateTime = LocalDateTime.now();

        if (localDateTime.isAfter(olympiad.getEndDate())) {
            throw new BadRequestException(ErrorCode.OLYMPIAD_HAS_ENDED);
        }

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        String newFileName = UUID.randomUUID().toString() + "." + extension;

        try {
            if (originalFileName.contains("..")) {
                throw new BadRequestException(HttpStatusCode.valueOf(400), "Filename contains invalid path sequence " + originalFileName);
            }

            Path solutions = Path.of(fileUploadDir).resolve("solutions");
            if (!Files.exists(solutions)) {
                Files.createDirectories(solutions);
            }

            Path taskSolutions = Path.of(solutions.toUri()).resolve("task_" + task_id);
            if (!Files.exists(taskSolutions)) {
                Files.createDirectories(taskSolutions);
            }
            Path targetLocation = taskSolutions.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation);

            answer.setFileName(newFileName);

            answerRepo.save(answer);

        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new BadRequestException(HttpStatusCode.valueOf(400), e.getMessage());
        }
    }

    public void uploadSolution(Long olympiad_id, Long task_id, SolutionDTO solutionDTO) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Student student = studentService.getStudentByAuthUser();
        Team team = student.getTeam();

        if (!olympiad.getTeams().contains(team)) {
            throw new BadRequestException(ErrorCode.TEAM_IS_NOT_PARTICIPANT_OF_OLYMPIAD);
        }

        Task task = taskService.getTaskById(task_id);
        if (!olympiad.getTasks().contains(task)) {
            throw new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD);
        }

        Answer answer = answerRepo.findAnswerByOlympiadAndTaskAndTeam(olympiad, task, team)
                .orElseThrow(() -> new BadRequestException(ErrorCode.ANSWER_NOT_FOUND));

        if (answer.getEndTime() != null) {
            throw new BadRequestException(ErrorCode.ANSWER_IS_ALREADY_ACCEPTED);
        }

        LocalDateTime localDateTime = LocalDateTime.now();

        if (localDateTime.isAfter(olympiad.getEndDate())) {
            throw new BadRequestException(ErrorCode.OLYMPIAD_HAS_ENDED);
        }

        answer.setEndTime(localDateTime);
        answer.setAns(solutionDTO.answer());

        answerRepo.save(answer);
    }

    public List<ResultDTO> summarize(Long olymp_id) {
        Olympiad olympiad = getOlympiad(olymp_id);

        List<Answer> answers = answerRepo.findAnswerByOlympiad(olympiad)
                .orElseThrow(() -> new BadRequestException(ErrorCode.ANSWER_NOT_FOUND));

        List<Result> results = resultRepo.findByOlympiad(olympiad)
                .orElse(null);

        if (results.size() > 0) {
            throw new BadRequestException(ErrorCode.RESULT_IS_ALREADY_SUMMARIZE);
        }

        setFinalMarkForAnswers(answers, olympiad);

        return resultMapper.toResultDTOs(setResults(answers, olympiad));
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
            System.out.println(task.getId() + ": q:" + q + " B:" + B);
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
                            BigDecimal extraPoints = new BigDecimal(answer.getTask().getExtraPointsForCreativeSolution());

                            score += answer.getCreativeRate().multiply(extraPoints).doubleValue();
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

        results.sort(Comparator.comparing(Result::getResultScore).reversed());
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setFinalPlace(i + 1);
        }

        resultRepo.saveAll(results);
        return results;
    }

    public List<ResultDTO> getResult(Long olympiad_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);

        if (resultRepo.findByOlympiad(olympiad).isEmpty()) {
            throw new BadRequestException(ErrorCode.RESULT_DOES_NOT_SUMMARIZE);
        }
        List<ResultDTO> resultDTOS = resultMapper.toResultDTOs(resultRepo.findByOlympiad(olympiad)
                .orElseThrow(() -> new BadRequestException(ErrorCode.RESULT_DOES_NOT_SUMMARIZE)));

        resultDTOS.sort(Comparator.comparing(ResultDTO::resultScore).reversed());
        return resultDTOS;
    }

//    public Resource getExcelSummarize(Long olympiad_id) throws IOException {
//        Olympiad olympiad = getOlympiad(olympiad_id);
//
//        try {
//            Path dirPath = Path.of(fileUploadDir).resolve("results");
//            if (Files.notExists(dirPath)) {
//                Files.createDirectories(dirPath);
//            }
//
//            Path filePath = dirPath.resolve(id + ".txt");
//            if (Files.notExists(filePath)) {
//                createFile(filePath);
//            }
//
//            return new FileSystemResource(filePath.toFile());
//        } catch (MalformedURLException e) {
//            throw new BadRequestException(HttpStatusCode.valueOf(400), "Error" + e.getMessage());
//        }
//
//    }
}
