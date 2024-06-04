package com.astu.ibolympapi.category.repository;

import com.astu.ibolympapi.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}
