package com.astu.ibolympapi.user.services;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import com.astu.ibolympapi.user.entities.User;
import com.astu.ibolympapi.user.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @SuppressWarnings("null")
    public void save(SignUpRequest request) {
        Optional<User> existingUser = repository.findByEmail(request.email());
        if (existingUser.isPresent()) {
            throw new BadRequestException(
                    ErrorCode.EMAIL_ALREADY_REGISTERED
            );
        }

        User user = User.builder()
                .name(request.name())
                .surname(request.surname())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .active(false)
                .build();
        repository.save(user);
    }
}
