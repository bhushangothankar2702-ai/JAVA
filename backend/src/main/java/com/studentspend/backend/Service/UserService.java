package com.studentspend.backend.service;

import com.studentspend.backend.entity.User;
import com.studentspend.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    } 
    public boolean loginUser(String email, String password) {
    return userRepository.findByEmail(email)
            .map(user -> passwordEncoder.matches(
                    password,
                    user.getPassword()
            ))
            .orElse(false);
}
}