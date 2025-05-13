package com.crud.to_do_task.controller;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/task")


public class TaskController {
  @Autowired
    TaskService taskService;

    @PostMapping("/add-task")
    public ResponseEntity<TaskRequest> createTask(@RequestBody TaskRequest task){
        TaskRequest response  = taskService.creatTask(task);
        System.out.println(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-tasks")
    public ResponseEntity<List<TaskRequest>> getAllTasks() {
        List<TaskRequest> response = taskService.getTasks();
        return ResponseEntity.ok(response);
    }


}
