package com.astu.ibolympapi.olympiads.controller;

import com.astu.ibolympapi.olympiads.dto.CreateOlympiadDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/olympadmin")
@RequiredArgsConstructor
public class OlympiadsAdminController {
    private final OlympiadService service;

    @PostMapping("/")
    public ResponseEntity<OlympiadDTO> createOlympiad(@RequestBody CreateOlympiadDTO createOlympiadDTO) {
        return ResponseEntity.ok(service.createOlympiad(createOlympiadDTO));
    }
}
