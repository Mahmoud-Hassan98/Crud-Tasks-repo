package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.UserRequest;
import com.crud.to_do_task.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service


public class UserService {
    @Autowired
    private  UserRepository userRepository  ;

     public List<UserRequest> getUsers (){
      return userRepository.findAll().stream().map(user ->  new UserRequest(user.getId()
              , user.getUsername()
              , user.getEmail())).collect(Collectors.toList());
    }


}
