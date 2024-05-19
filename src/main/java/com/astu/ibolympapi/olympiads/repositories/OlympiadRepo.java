package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OlympiadRepo extends JpaRepository<Olympiad, Long> {
}
