package com.crud.to_do_task.repository;

import com.crud.to_do_task.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task , Long> {

}

