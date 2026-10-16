package de.loopie.service;

import de.loopie.dto.LoginRequest;
import de.loopie.dto.RegisterRequest;
import de.loopie.dto.UserResponseDTO;
import de.loopie.entity.User;
import de.loopie.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponseDTO registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("This E-mail already exists");
        }

        if (request.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password too short");
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        String generatedPublicId;
        do {
            generatedPublicId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (userRepository.findByPublicId(generatedPublicId).isPresent());

        newUser.setPublicId(generatedPublicId);

        User savedUser = userRepository.save(newUser);
        return new UserResponseDTO(savedUser);
    }

    public UserResponseDTO login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid E-Mail or Password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid E-Mail or Password.");
        }
        return new UserResponseDTO(user);
    }
}