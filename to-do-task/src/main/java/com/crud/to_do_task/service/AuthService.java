package com.crud.to_do_task.service;

import com.crud.to_do_task.config.SecurityConfig;
import com.crud.to_do_task.dto.AuthResponse;
import com.crud.to_do_task.dto.LoginRequest;
import com.crud.to_do_task.dto.RegisterRequest;
import com.crud.to_do_task.model.entity.User;
import com.crud.to_do_task.repository.UserRepository;
import com.crud.to_do_task.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw  new RuntimeException("email already exists") ;
        }
         User user = new User();
          user.setEmail(request.getEmail());
          user.setPassword(passwordEncoder.encode(request.getPassword()));
          user.setUsername(request.getUsername());
          user.setRole("ROLE_USER");



          userRepository.save(user) ;
            String token = jwtService.generateToken(user.getId() , user.getUsername() , user.getEmail() , user.getRole());
        return     new AuthResponse(token);
    }
    public AuthResponse login(LoginRequest request) {

       User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new RuntimeException("user not found"));
        System.out.println(passwordEncoder.matches(request.getPassword() , user.getPassword()));
       if(!passwordEncoder.matches(request.getPassword() , user.getPassword())) {
         throw  new RuntimeException("Invalid credentials");

       }
         String token = jwtService.generateToken(user.getId() , user.getUsername() , user.getEmail() , user.getRole());
        System.out.println(token);
        System.out.println(new AuthResponse(token));
        return new AuthResponse(token);

    }
}
