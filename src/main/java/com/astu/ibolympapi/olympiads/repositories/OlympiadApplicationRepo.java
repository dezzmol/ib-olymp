package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.olympiads.entities.OlympiadApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OlympiadApplicationRepo extends JpaRepository<OlympiadApplication, Long> {
    List<OlympiadApplication> getOlympiadApplicationByOlympiad(Olympiad olympiad);
}
