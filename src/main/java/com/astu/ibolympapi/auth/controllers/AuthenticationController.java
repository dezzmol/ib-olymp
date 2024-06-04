package com.astu.ibolympapi.auth.controllers;

import com.astu.ibolympapi.auth.services.AuthenticationService;
import com.astu.ibolympapi.user.dto.SignInRequest;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication, Registration", description = "Authentication, Registration")
public class AuthenticationController {
    private final AuthenticationService service;

    @Operation(summary = "Sign up")
    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> register(@RequestBody @Valid SignUpRequest request) {
        service.signUp(request);
        return ResponseEntity.ok("created");
    }

    @Operation(summary = "Sign in")
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody @Valid SignInRequest signIn, HttpServletResponse response) {
        return ResponseEntity.ok(service.signIn(signIn, response));
    }

    @Operation(summary = "Activate account")
    @GetMapping("/activate/{activate-token}")
    public ResponseEntity<?> activate(@PathVariable("activate-token") String activateToken) {
        service.activate(activateToken);
        return null;
    }
}
