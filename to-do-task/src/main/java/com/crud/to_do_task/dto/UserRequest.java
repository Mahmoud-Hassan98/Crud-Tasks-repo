package com.crud.to_do_task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserRequest {
    Long id ;
    String username;
    String email ;
    private Long assignedTasks;
}
