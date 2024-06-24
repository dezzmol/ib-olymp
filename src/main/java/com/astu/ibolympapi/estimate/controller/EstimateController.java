package com.astu.ibolympapi.estimate.controller;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.estimate.dto.RateSolutionDTO;
import com.astu.ibolympapi.estimate.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/olymp/{olymp_id}/solutions/{task_id}")
    public ResponseEntity<List<AnswerDTO>> getSolution(@PathVariable Long olymp_id, @PathVariable Long task_id) {
        return ResponseEntity.ok(service.getAnswersByOlympiadAndTask(olymp_id, task_id));
    }

    @GetMapping("/olymp/{olymp_id}/solution/{task_id}/attachments/{fileName:.+}")
    public ResponseEntity<Resource> getOlympiadAttachment(@PathVariable Long olymp_id, @PathVariable Long task_id, @PathVariable String fileName) {
        Resource resource = service.getFile(olymp_id, task_id, fileName);
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    @PostMapping("/olymp/{olymp_id}/solution/{solution_id}")
    public ResponseEntity<String> rateSolution(@PathVariable Long olymp_id, @PathVariable Long solution_id, @RequestBody RateSolutionDTO rateSolutionDTO) {
        service.rateSolution(olymp_id, solution_id, rateSolutionDTO);
        return ResponseEntity.ok("Solution rated");
    }

    @PostMapping("/olymp/{olymp_id}")
    public ResponseEntity<String> summarize(@PathVariable Long olymp_id) {
        service.summarize(olymp_id);
        return ResponseEntity.ok("123");
    }
}
