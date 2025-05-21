package com.crud.to_do_task.controller;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.dto.UserRequest;
import com.crud.to_do_task.service.TaskService;
import com.crud.to_do_task.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")


public class AdminController {
  @Autowired
    TaskService taskService;
   @Autowired
    UserService userService ;

    @PostMapping("/add-task")
    public ResponseEntity<TaskRequest> createTask(@RequestBody TaskRequest task){
        System.out.println(555555);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authorities: " + auth.getAuthorities());
        System.out.println(task);
        TaskRequest response  = taskService.creatTask(task);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-tasks")
    public ResponseEntity<List<TaskRequest>> getAllTasks() {
        List<TaskRequest> response = taskService.getTasks();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserRequest>> getUsers() {
        List<UserRequest> response = userService.getUsers();
        return ResponseEntity.ok(response);
    }


}
