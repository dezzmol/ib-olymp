package com.astu.ibolympapi.olympiads.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.olympiads.dto.CreateOlympiadDTO;
import com.astu.ibolympapi.olympiads.dto.OlympiadDTO;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.mapper.OlympiadMapper;
import com.astu.ibolympapi.olympiads.repositories.OlympiadRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class OlympiadService {
    private final OlympiadRepo olympiadRepo;
    private final OlympiadMapper olympiadMapper;

    public OlympiadDTO createOlympiad(CreateOlympiadDTO newOlympiad) {
        Olympiad olympiad = Olympiad.builder()
                .name(newOlympiad.name())
                .description(newOlympiad.description())
                .university(newOlympiad.university())
                .startDate(newOlympiad.startDate())
                .endDate(newOlympiad.endDate())
                .teams(new ArrayList<>())
                .tasks(new ArrayList<>())
                .build();

        olympiadRepo.save(olympiad);
        return olympiadMapper.toOlympiadDTO(olympiad);
    }

    public OlympiadDTO getOlympiad(Long id) {
        Olympiad olympiad = olympiadRepo.findById(id)
                .orElseThrow(() -> new BadRequestException(HttpStatusCode.valueOf(401), "Olympiad not found"));

        return olympiadMapper.toOlympiadDTO(olympiad);
    }
}
