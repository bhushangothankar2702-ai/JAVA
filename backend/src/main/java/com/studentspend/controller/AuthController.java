package com.studentspend.backend.controller;

import com.studentspend.backend.entity.User;
import com.studentspend.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "message", "Registration successful",
                            "id", savedUser.getId(),
                            "name", savedUser.getName(),
                            "email", savedUser.getEmail()
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
            );
        }
    }
    public record LoginRequest(String email, String password) {}

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    boolean success = userService.loginUser(
            request.email(),
            request.password()
    );

    if (success) {
        return ResponseEntity.ok(
                Map.of("message", "Login successful")
        );
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            Map.of("error", "Invalid email or password")
    );
}
}