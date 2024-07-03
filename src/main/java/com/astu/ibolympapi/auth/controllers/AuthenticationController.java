package com.astu.ibolympapi.auth.controllers;

import com.astu.ibolympapi.auth.dto.AuthenticationResponse;
import com.astu.ibolympapi.auth.services.AuthenticationService;
import com.astu.ibolympapi.tokens.TokenType;
import com.astu.ibolympapi.user.dto.SignInRequest;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import com.astu.ibolympapi.user.dto.UserDTO;
import com.astu.ibolympapi.web.Web;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication, Registration", description = "Authentication, Registration")
public class AuthenticationController {
    private final AuthenticationService service;
    private final Web web;

    @Operation(summary = "Sign up")
    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> register(@RequestBody @Valid SignUpRequest request) {
        service.signUp(request);
        return ResponseEntity.ok("created");
    }

    @Operation(summary = "Sign in")
    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> signIn(@RequestBody @Valid SignInRequest signIn, HttpServletResponse response) {
        return ResponseEntity.ok(service.signIn(signIn, response));
    }

    @Operation(summary = "Activate account")
    @GetMapping("/activate/{activate-token}")
    public ResponseEntity<?> activate(@PathVariable("activate-token") String activateToken, HttpServletResponse response) throws IOException {
        service.activate(activateToken);
        response.sendRedirect(web.getAllowedOrigins().get(0));
        return null;
    }

    @Operation(summary = "Refresh access token")
    @GetMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(@CookieValue("REFRESH_TOKEN") String refreshToken, HttpServletResponse response) {
        return ResponseEntity.ok(service.refreshAccessToken(refreshToken, response));
    }

    @Operation(summary = "Get user data")
    @PostMapping("/getdata")
    public ResponseEntity<UserDTO> getData(@CookieValue("REFRESH_TOKEN") String refreshToken) {
        return ResponseEntity.ok(service.getData(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        service.logout(response);
        return ResponseEntity.ok("logout");
    }
}
