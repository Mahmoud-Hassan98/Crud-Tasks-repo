package com.crud.to_do_task.service;

import com.crud.to_do_task.dto.AuthResponse;
import com.crud.to_do_task.dto.RegisterRequest;
import com.crud.to_do_task.model.entity.User;
import com.crud.to_do_task.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;


    public AuthResponse register(RegisterRequest request) {
        System.out.println(11111);
        System.out.println(request);
        System.out.println(userRepository.existsByEmail(request.getEmail()));

        if(userRepository.existsByEmail(request.getEmail())) {
            System.out.println(222);
            throw  new RuntimeException("email already exists") ;
        }
        System.out.println(3333);
         User user = new User();
          user.setEmail(request.getEmail());
          user.setPassword(request.getPassword());
          user.setUsername(request.getUsername());
          userRepository.save(user) ;
            String token = "85848499884948949" ;
        return     new AuthResponse(token);
    }
}
