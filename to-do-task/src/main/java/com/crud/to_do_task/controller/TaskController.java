package com.crud.to_do_task.controller;

import com.crud.to_do_task.model.entity.Task;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tasks")


public class TaskController {


    @PostMapping("/add-task")
    public Task createTask(@RequestBody Task task){

        return task;
    }


}
