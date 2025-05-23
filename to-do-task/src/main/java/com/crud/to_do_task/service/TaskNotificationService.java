package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TaskNotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public TaskNotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendTaskToUser(Long userId, TaskRequest task) {
        messagingTemplate.convertAndSend("/topic/tasks/" + userId, task);
    }
}