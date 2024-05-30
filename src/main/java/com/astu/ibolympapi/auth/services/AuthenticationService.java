package com.astu.ibolympapi.auth.services;

import com.astu.ibolympapi.auth.dto.AuthenticationResponse;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.mail.service.MailService;
import com.astu.ibolympapi.tokens.TokenService;
import com.astu.ibolympapi.tokens.TokenType;
import com.astu.ibolympapi.user.dto.SignInRequest;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import com.astu.ibolympapi.user.entities.User;
import com.astu.ibolympapi.user.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class AuthenticationService {
    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    public void signUp(SignUpRequest request) {
        userService.signUp(request);
        sendActivationLink(request);
    }

    public AuthenticationResponse signIn(SignInRequest authRequest, HttpServletResponse response) {
        final Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
        } catch (BadCredentialsException e) {
            throw new BadRequestException(ErrorCode.INVALID_CREDENTIALS);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = tokenService.generateAccessToken(authRequest.username(), TokenType.ACCESS_TOKEN);
        String refreshToken = tokenService.generateRefreshToken(authRequest.username(), TokenType.REFRESH_TOKEN);
        Cookie cookie = new Cookie(TokenType.REFRESH_TOKEN.toString(), refreshToken);
        response.addCookie(cookie);
        return new AuthenticationResponse(TokenType.REFRESH_TOKEN.name() , accessToken, TokenType.ACCESS_TOKEN.getTokenExpiration());
    }

    public void activate(String activateToken) {
        try {
            String email = tokenService.extractUsernameFromJWT(activateToken);
            Optional<User> user = userService.findByEmail(email);
            user.ifPresent(userService::save);
        } catch (RuntimeException e) {
            throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
        }
    }

    public void sendActivationLink(SignUpRequest request) {
        String activateToken = tokenService.generateActivateToken(request.email(), TokenType.ACTIVATE_TOKEN);
        String link = "http://localhost:8080/api/v1/auth/activate/" + activateToken;
        mailService.sendSimpleEmail(request.email(), "Активация аккаунта", "Для активации аккаунта перейдите по ссылке " + link);
    }
}
