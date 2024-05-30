package com.astu.ibolympapi.student.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.student.dto.StudentDTO;
import com.astu.ibolympapi.student.dto.StudentRegistrationDTO;
import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.student.mapper.StudentMapper;
import com.astu.ibolympapi.student.repository.StudentRepo;
import com.astu.ibolympapi.team.entity.InviteToken;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.team.repository.InviteTokenRepo;
import com.astu.ibolympapi.team.repository.TeamRepo;
import com.astu.ibolympapi.user.entities.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {
    private final StudentRepo repo;
    private final TeamRepo teamRepo;
    private final StudentMapper studentMapper;
    private final InviteTokenRepo inviteTokenRepo;

    public void registration(StudentRegistrationDTO studentRegistrationDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = null;
        if (principal instanceof UserDetails) {
            user = (User) ((UserDetails) principal);
        }

        Optional<Student> optionalStudent = repo.findByUser(user);

        if (optionalStudent.isPresent()) {
            throw new BadRequestException(ErrorCode.STUDENT_ALREADY_REGISTERED);
        }

        Student student = Student.builder()
                .age(studentRegistrationDTO.age())
                .university(studentRegistrationDTO.university())
                .isCaptain(false)
                .team(null)
                .phoneNumber(studentRegistrationDTO.phoneNumber())
                .user(user)
                .otherContactsData(studentRegistrationDTO.otherContactsData())
                .build();

        repo.save(student);
    }

    public StudentDTO getStudent(Long id) {
        return studentMapper.toStudentDTO(repo.findById(id).orElseThrow(
                () -> new BadRequestException(ErrorCode.STUDENT_NOT_FOUND)
        ));
    }

    public void joinTeam(String token) {
        InviteToken inviteToken = inviteTokenRepo.findByToken(token)
                .orElseThrow(() -> new BadRequestException(ErrorCode.TOKEN_NOT_FOUND));

        Team team = inviteToken.getTeam();

        if (team.getStudents().size() >= 5) {
            throw new BadRequestException(ErrorCode.TEAM_IS_FULL);
        }

        Student student = getStudentByAuthUser();

        if (team.getStudents().contains(student)) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_TEAM);
        }

        if (student.getTeam() != null) {
            throw new BadRequestException(ErrorCode.STUDENT_HAS_TEAM);
        }

        student.setTeam(team);
        student.setIsCaptain(false);
        repo.save(student);
        inviteTokenRepo.delete(inviteToken);
    }

    public Student getStudentByAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = null;
        if (principal instanceof UserDetails) {
            user = (User) ((UserDetails) principal);
        }

        return repo.findByUser(user)
                .orElseThrow(() -> new BadRequestException(ErrorCode.STUDENT_NOT_FOUND)
                );
    }
}
