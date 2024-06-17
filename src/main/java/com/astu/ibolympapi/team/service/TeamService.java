package com.astu.ibolympapi.team.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.student.dto.CreateTeamDTO;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.repository.StudentRepo;
import com.astu.ibolympapi.student.service.StudentService;
import com.astu.ibolympapi.team.dto.TeamDTO;
import com.astu.ibolympapi.team.entity.InviteToken;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.team.mapper.TeamMapper;
import com.astu.ibolympapi.team.repository.InviteTokenRepo;
import com.astu.ibolympapi.team.repository.TeamRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@PropertySource("application.properties")
public class TeamService {
    private final TeamRepo repo;
    private final StudentRepo studentRepo;
    private final TeamMapper teamMapper;
    private final InviteTokenRepo inviteTokenRepo;
    private final StudentService studentService;
    @Value("${spring.server.url}")
    private String serverUrl;

    public TeamDTO createTeam(CreateTeamDTO createTeamDTO) {
        Student optionalStudent = studentService.getStudentByAuthUser();

        if (optionalStudent.getTeam() != null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_TEAM);
        }

        Team team = Team.builder()
                .name(createTeamDTO.name())
                .build();

        repo.save(team);
        optionalStudent.setIsCaptain(true);
        optionalStudent.setTeam(team);
        studentRepo.save(optionalStudent);

        return teamMapper.toTeamDTO(team);
    }

    public TeamDTO getTeamByUser() {
        Student student = studentService.getStudentByAuthUser();

        if (student.getTeam() == null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        if (!student.getIsCaptain()) {
            throw new BadRequestException(ErrorCode.STUDENT_IS_NOT_CAPTAIN);
        }

        Team team = student.getTeam();

        return teamMapper.toTeamDTO(team);
    }

    public TeamDTO getTeamDTO(Long teamId) {
        return teamMapper.toTeamDTO(repo.findById(teamId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.TEAM_NOT_FOUND)));
    }

    public Team getTeam(Long teamId) {
        return repo.findById(teamId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.TEAM_NOT_FOUND));
    }

    public String generateInviteLink() {
        Student optionalStudent = studentService.getStudentByAuthUser();

        if (optionalStudent.getTeam() == null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        if (!optionalStudent.getIsCaptain()) {
            throw new BadRequestException(ErrorCode.STUDENT_IS_NOT_CAPTAIN);
        }

        if (optionalStudent.getTeam().getStudents().size() > 5) {
            throw new BadRequestException(ErrorCode.TEAM_IS_FULL);
        }

        InviteToken inviteToken = InviteToken.builder()
                .team(optionalStudent.getTeam())
                .build();

        inviteTokenRepo.save(inviteToken);

        return "http://" + serverUrl + "/api/v1/student/joinTeam/" + inviteToken.getToken();
    }

    public void removeStudentFromTeam(Long studentId) {
        Student optionalStudent = studentService.getStudentByAuthUser();

        if (optionalStudent.getTeam() == null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        if (!optionalStudent.getIsCaptain()) {
            throw new BadRequestException(ErrorCode.STUDENT_IS_NOT_CAPTAIN);
        }

        Team team = optionalStudent.getTeam();
        Student studentForKick = studentService.getStudent(studentId);

        if (!team.getStudents().contains(studentForKick)) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_NOT_TEAM);
        }

        team.getStudents().remove(optionalStudent);
        repo.save(team);
    }
}
