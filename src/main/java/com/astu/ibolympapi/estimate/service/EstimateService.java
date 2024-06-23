package com.astu.ibolympapi.estimate.service;

import com.astu.ibolympapi.estimate.dto.AnswerDTO;
import com.astu.ibolympapi.olympiads.entities.Answer;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.mapper.AnswerMapper;
import com.astu.ibolympapi.olympiads.repositories.AnswerRepo;
import com.astu.ibolympapi.olympiads.service.OlympiadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {
    private final OlympiadService olympiadService;
    private final AnswerRepo answerRepo;
    private final AnswerMapper answerMapper;

    public List<AnswerDTO> getAnswers(Long olymp_id) {
        Olympiad olympiad = olympiadService.getOlympiad(olymp_id);

        List<Answer> answers = answerRepo.findAnswerByOlympiad(olympiad)
                .orElse(null);

        return answerMapper.toAnswerDTOs(answers);
    }
}
