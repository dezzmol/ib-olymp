package com.astu.ibolympapi.estimate.controller;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.estimate.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/estimate/")
@RequiredArgsConstructor
public class EstimateController {
    private final EstimateService service;

    @GetMapping("/olymp/{olymp_id}/solutions")
    public ResponseEntity<List<AnswerDTO>> getSolutions(@PathVariable Long olymp_id) {
        return ResponseEntity.ok(service.getAnswers(olymp_id));
    }
}
