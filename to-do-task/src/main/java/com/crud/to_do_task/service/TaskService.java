package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.model.entity.Task;
import com.crud.to_do_task.model.entity.User;
import com.crud.to_do_task.repository.TaskRepository;
import com.crud.to_do_task.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskNotificationService taskNotificationService;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserRepository userRepository;

    public TaskRequest creatTask(TaskRequest request ,MultipartFile imageFile) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        Task task = new Task();
        task.setUser(user);
        task.setName(request.getName());
        task.setDeadline(request.getDeadline());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        if (imageFile != null && !imageFile.isEmpty()) {
            System.out.println(15);
            System.out.println(imageFile);
            try {
                String uploadDir = "uploads/";
                String fileName = UUID.randomUUID() + "_" +imageFile.getOriginalFilename().replaceAll("\\s+", "_");
                System.out.println(fileName);
                Path path = Paths.get(uploadDir + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, imageFile.getBytes());
                task.setImageUrl("/images/" + fileName);


            } catch (IOException e) {
                throw new RuntimeException( "Failed to save image file" , e);
            }
        }
        System.out.println(task);
        taskRepository.save(task);

        TaskRequest response = new TaskRequest(task.getId(), task.getName(), task.getUser().getId(),
                task.getUser().getUsername(), task.getDeadline(), task.getDescription(), task.getStatus(), task.getImageUrl() );

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
                        task.getDescription(),
                        task.getStatus(),
                        task.getImageUrl()
                ))
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
                task.getStatus(),
                task.getImageUrl())).collect(Collectors.toList());

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
        return new TaskRequest(task.getId() , task.getName() , task.getUser().getId() , task.getUser().getUsername() , task.getDeadline() , task.getDescription() , task.getStatus() , task.getImageUrl() );

    }


}














