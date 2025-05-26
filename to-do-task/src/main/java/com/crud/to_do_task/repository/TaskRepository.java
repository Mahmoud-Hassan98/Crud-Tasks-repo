package com.crud.to_do_task.repository;

import com.crud.to_do_task.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task , Long> {
    long countByUserId(Long userId);
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndStatus(Long userId, String status);

}

