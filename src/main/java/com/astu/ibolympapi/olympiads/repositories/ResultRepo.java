package com.astu.ibolympapi.olympiads.repositories;

import com.astu.ibolympapi.olympiads.entities.Result;
import com.astu.ibolympapi.olympiads.entities.Olympiad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultRepo extends JpaRepository<Result, Long> {
    Optional<List<Result>> findByOlympiad(Olympiad olympiad);
}
