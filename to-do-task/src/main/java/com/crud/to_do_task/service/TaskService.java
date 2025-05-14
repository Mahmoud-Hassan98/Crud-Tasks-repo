package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.TaskRequest;
import com.crud.to_do_task.model.entity.Task;
import com.crud.to_do_task.model.entity.User;
import com.crud.to_do_task.repository.TaskRepository;
import com.crud.to_do_task.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {


     @Autowired
    TaskRepository taskRepository;
     @Autowired
    UserRepository userRepository ;
     public TaskRequest creatTask(TaskRequest request) {
         User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));
         Task  task = new Task();
         task.setUser(user);
         task.setName(request.getName());
         task.setDeadline(request.getDeadline());
         task.setDescription(request.getDescription());
         task.setStatus(request.getStatus());
         taskRepository.save(task);
         return new TaskRequest(task.getId() , task.getName() , task.getUser().getId() , task.getUser().getUsername() , task.getDeadline() , task.getDescription() , task.getStatus());
     }
     public List<TaskRequest> getTasks(){
         return taskRepository.findAll().stream().map(task-> new TaskRequest(
                 task.getId() ,
                 task.getName() ,
                 task.getUser().getId(),
                 task.getUser().getUsername(),
                 task.getDeadline() ,
                 task.getDescription(), task.getStatus()))
                 .collect(Collectors.toList());


     }

}














