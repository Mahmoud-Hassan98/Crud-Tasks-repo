package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.model.entity.Task;
import com.crud.to_do_task.model.entity.User;
import com.crud.to_do_task.repository.TaskRepository;
import com.crud.to_do_task.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskNotificationService taskNotificationService;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserRepository userRepository;

    public TaskRequest creatTask(TaskRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        Task task = new Task();
        task.setUser(user);
        task.setName(request.getName());
        task.setDeadline(request.getDeadline());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        taskRepository.save(task);

        TaskRequest response = new TaskRequest(task.getId(), task.getName(), task.getUser().getId(),
                task.getUser().getUsername(), task.getDeadline(), task.getDescription(), task.getStatus());

        taskNotificationService.sendTaskToUser(user.getId(), response);

        return response;
    }
    public List<TaskRequest> getTasks() {
        return taskRepository.findAll().stream().map(task -> new TaskRequest(
                        task.getId(),
                        task.getName(),
                        task.getUser().getId(),
                        task.getUser().getUsername(),
                        task.getDeadline(),
                        task.getDescription(), task.getStatus()))
                .collect(Collectors.toList());


    }

    public List<TaskRequest> getTasksByUserId(Long userId , String status) {
        List<Task> tasks;

         if(status !=null && !status.isEmpty()) {
          tasks = taskRepository.findByUserIdAndStatus(userId , status);

         } else {
             tasks = taskRepository.findByUserId(userId) ;
         }


        return tasks.stream().map(task -> new TaskRequest(
                task.getId(),
                task.getName(),
                task.getUser().getId(),
                task.getUser().getUsername(),
                task.getDeadline(),
                task.getDescription(),
                task.getStatus())).collect(Collectors.toList());

    }

    public void removeTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public TaskRequest updateTask(Long taskId, TaskRequest taskRequest) {

        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        existingTask.setName(taskRequest.getName());
        existingTask.setDescription(taskRequest.getDescription());
        existingTask.setDeadline(taskRequest.getDeadline());
        existingTask.setStatus(taskRequest.getStatus());
        if (taskRequest.getUserId() != null) {
            User user = userRepository.findById(taskRequest.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("user not found"));
            existingTask.setUser(user);
            taskRequest.setUsername(user.getUsername());

        }

        taskRepository.save(existingTask);
        return taskRequest;

    }
    public   TaskRequest completeTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(()->new EntityNotFoundException("Task not found "));
        task.setStatus("Completed");
        taskRepository.save(task);
        return new TaskRequest(task.getId() , task.getName() , task.getUser().getId() , task.getUser().getUsername() , task.getDeadline() , task.getDescription() , task.getStatus() );

    }


}














