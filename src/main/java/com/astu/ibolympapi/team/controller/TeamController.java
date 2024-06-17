package com.astu.ibolympapi.team.controller;

import com.astu.ibolympapi.student.dto.CreateTeamDTO;
import com.astu.ibolympapi.team.dto.TeamDTO;
import com.astu.ibolympapi.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService service;

    @PostMapping("/")
    public ResponseEntity<TeamDTO> createTeam(@RequestBody CreateTeamDTO createTeamDTO) {
        return ResponseEntity.ok(service.createTeam(createTeamDTO));
    }

    @GetMapping("/")
    public ResponseEntity<TeamDTO> getTeamByUser() {
        return ResponseEntity.ok(service.getTeamByUser());
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<TeamDTO> getTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(service.getTeamDTO(teamId));
    }

    @PostMapping("/generateLink")
    public ResponseEntity<String> inviteToTheTeam() {
        return ResponseEntity.ok(service.generateInviteLink());
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<String> removeStudentFromTeam(@PathVariable Long studentId) {
        service.removeStudentFromTeam(studentId);
        return ResponseEntity.ok("Removed student from the team");
    }
}
