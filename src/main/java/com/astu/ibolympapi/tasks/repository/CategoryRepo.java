package com.astu.ibolympapi.tasks.repository;

import com.astu.ibolympapi.tasks.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}
