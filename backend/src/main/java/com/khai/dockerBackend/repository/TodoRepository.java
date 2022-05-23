package com.khai.dockerBackend.repository;

import com.khai.dockerBackend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}