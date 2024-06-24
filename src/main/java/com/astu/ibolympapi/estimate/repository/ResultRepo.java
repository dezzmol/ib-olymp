package com.astu.ibolympapi.estimate.repository;

import com.astu.ibolympapi.estimate.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepo extends JpaRepository<Result, Long> {
}
