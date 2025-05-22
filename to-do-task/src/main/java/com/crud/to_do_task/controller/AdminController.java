package com.crud.to_do_task.controller;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.dto.UserRequest;
import com.crud.to_do_task.service.TaskService;
import com.crud.to_do_task.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")


public class AdminController {
  @Autowired
    TaskService taskService;
   @Autowired
    UserService userService ;

    @PostMapping("/add-task")
    public ResponseEntity<TaskRequest> createTask(@RequestBody TaskRequest task){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
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

    @DeleteMapping("/{taskId}/remove-task")
    public ResponseEntity<Map<String, String>> removeTask(@PathVariable Long taskId) {
        try {
            taskService.removeTask(taskId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Task deleted successfully.");
            return ResponseEntity.ok(response); // returns JSON with Content-Type: application/json
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Task not found with ID: " + taskId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete task: " + e.getMessage()));
        }
    }
    @PutMapping("/{taskId}/update-task")
    public ResponseEntity<TaskRequest> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest taskRequest) {

        try {
            TaskRequest updatedTask = taskService.updateTask(taskId, taskRequest);
            return ResponseEntity.ok(updatedTask);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // or return a custom error response if needed
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // or handle more gracefully
        }
    }
}
