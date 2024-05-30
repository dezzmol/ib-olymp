package com.astu.ibolympapi.team.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.student.dto.CreateTeamDTO;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.repository.StudentRepo;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.team.repository.TeamRepo;
import com.astu.ibolympapi.user.entities.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepo repo;
    private final StudentRepo studentRepo;

    public void createTeam(CreateTeamDTO createTeamDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = null;
        if (principal instanceof UserDetails) {
            user = (User) ((UserDetails) principal);
        }

        Optional<Student> optionalStudent = studentRepo.findByUser(user);

        if (optionalStudent.isEmpty()) {
            throw new BadRequestException(ErrorCode.STUDENT_ALREADY_REGISTERED);
        }

        Team team = Team.builder()
                .name(createTeamDTO.name())
                .build();

        repo.save(team);
    }

    public Team getTeam(Long teamId) {
        return repo.getReferenceById(teamId);
    }
}
