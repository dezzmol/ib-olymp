package com.astu.ibolympapi.olympiads.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.dto.CreateOlympiadDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadApplicationsDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.entities.OlympiadApplication;
import com.astu.ibolympapi.olympiads.mapper.OlympiadMapper;
import com.astu.ibolympapi.olympiads.repositories.OlympiadApplicationRepo;
import com.astu.ibolympapi.olympiads.repositories.OlympiadRepo;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.service.StudentService;
import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.OlympiadTask;
import com.astu.ibolympapi.tasks.entities.Task;
import com.astu.ibolympapi.tasks.repository.OlympiadTaskRepo;
import com.astu.ibolympapi.tasks.service.TaskService;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.team.mapper.TeamMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    private final TaskService taskService;

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

        Student student = studentService.getStudentByAuthUser();

        if (student.getTeam() == null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        if (student.getIsCaptain()) {
            throw new BadRequestException(ErrorCode.STUDENT_IS_NOT_CAPTAIN);
        }

        Team team = student.getTeam();

        OlympiadApplication olympiadApplication = OlympiadApplication.builder()
                .olympiad(olympiad)
                .team(team)
                .build();

        olympiadApplicationRepo.save(olympiadApplication);
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

    public TaskDTO getOlympiadTask(Long olympiad_id, Long task_id) {
        Olympiad olympiad = getOlympiad(olympiad_id);
        Task task = taskService.getTaskById(task_id);

        OlympiadTask olympiadTask = olympiadTaskRepo.getOlympiadTaskByOlympiadAndTask(olympiad, task)
                .orElseThrow(() -> new BadRequestException(ErrorCode.TASK_IS_NOT_IN_OLYMPIAD));

        return taskService.getTaskDTO(olympiadTask.getTask().getId());
    }

    public void addTaskToOlymp(Long taksId, Long olympId) {
        Task task = taskService.getTaskById(taksId);
        Olympiad olympiad = getOlympiad(olympId);

        OlympiadTask olympiadTask = OlympiadTask.builder()
                .task(task)
                .olympiad(olympiad)
                .build();

        olympiadTaskRepo.save(olympiadTask);
    }
}
