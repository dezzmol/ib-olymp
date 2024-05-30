package com.astu.ibolympapi.student.repository;

import com.astu.ibolympapi.student.entity.Student;
import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Long> {
    Optional<List<Student>> findByTeam(Team team);
    Optional<Student> findByUser(User user);
}
