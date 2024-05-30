package com.astu.ibolympapi.team.controller;

import com.astu.ibolympapi.student.dto.CreateTeamDTO;
import com.astu.ibolympapi.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService service;

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody CreateTeamDTO createTeamDTO) {
        service.createTeam(createTeamDTO);
        return ResponseEntity.ok("Team created");
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(service.getTeam(teamId));
    }
}
