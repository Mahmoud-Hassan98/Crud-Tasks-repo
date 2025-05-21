package com.crud.to_do_task.controller;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.dto.UserRequest;
import com.crud.to_do_task.service.TaskService;
import com.crud.to_do_task.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public  ResponseEntity<List<TaskRequest>> getUserTasks() {
        String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = Long.parseLong(userIdStr); // convert from String to Long
         List<TaskRequest> response = taskService.getTasksByUserId(userId) ;
        return ResponseEntity.ok(response);

    }



}





