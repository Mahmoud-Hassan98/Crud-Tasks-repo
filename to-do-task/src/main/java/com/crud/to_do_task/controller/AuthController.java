package com.crud.to_do_task.controller;
import com.crud.to_do_task.dto.AuthResponse;
import com.crud.to_do_task.dto.LoginRequest;
import com.crud.to_do_task.dto.RegisterRequest;
import com.crud.to_do_task.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest user) {
        AuthResponse response = authService.register(user);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
          AuthResponse response = authService.login(request);
         return  ResponseEntity.ok(response) ;
    }
}