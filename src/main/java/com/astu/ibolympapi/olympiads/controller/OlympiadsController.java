package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.CreateOlympiadDTO;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/olymp")
@RequiredArgsConstructor
public class OlympiadsController {
    private final OlympiadService service;

    @PostMapping("/")
    public ResponseEntity<?> createOlympiad(@RequestBody CreateOlympiadDTO createOlympiadDTO) {
        return ResponseEntity.ok(service.createOlympiad(createOlympiadDTO));
    }

    @GetMapping("/{olympiad_id}")
    public ResponseEntity<?> getOlympiadById(@PathVariable Long olympiad_id) {
        return ResponseEntity.ok(service.getOlympiad(olympiad_id));
    }
}
