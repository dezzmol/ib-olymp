package com.astu.ibolympapi.auth.services;

import com.astu.ibolympapi.auth.dto.AuthenticationResponse;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.mail.service.MailService;
import com.astu.ibolympapi.tokens.TokenService;
import com.astu.ibolympapi.tokens.TokenType;
import com.astu.ibolympapi.user.dto.SignInRequest;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import com.astu.ibolympapi.user.dto.UserDTO;
import com.astu.ibolympapi.user.entities.User;
import com.astu.ibolympapi.user.repositories.UserRepo;
import com.astu.ibolympapi.user.services.UserService;
import com.astu.ibolympapi.web.Web;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@PropertySource("application.properties")
public class AuthenticationService {
    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;
    private final UserRepo userRepo;
    @Value("${spring.server.url}")
    private String serverUrl;
    private final Web web;

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
        cookie.setHttpOnly(true);
	System.out.println(cookie.getDomain());
        response.addCookie(cookie);
        return new AuthenticationResponse(TokenType.ACCESS_TOKEN.name(), accessToken, TokenType.ACCESS_TOKEN.getTokenExpiration());
    }

    public void activate(String activateToken) {
        String username = tokenService.extractUsernameFromJWT(activateToken);
        System.out.println(username);
        User user = userService.findByUsername(username).orElseThrow(
                () -> new BadRequestException(ErrorCode.USER_NOT_FOUND)
        );

        user.setActive(true);
        userRepo.save(user);
    }

    public void sendActivationLink(SignUpRequest request) {
        String activateToken = tokenService.generateActivateToken(request.username(), TokenType.ACTIVATE_TOKEN);
        String link = "http://" + serverUrl + "/api/v1/auth/activate/" + activateToken;
        mailService.sendSimpleEmail(request.email(), "Активация аккаунта", "Для активации аккаунта перейдите по ссылке " + link);
    }

    public AuthenticationResponse refreshAccessToken(String refreshToken, HttpServletResponse response) {
        if (!tokenService.validateToken(refreshToken)) {
            logout(response);
            throw new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String username = tokenService.extractUsernameFromJWT(refreshToken);
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ErrorCode.USER_NOT_FOUND));

        String newAccessToken = tokenService.generateAccessToken(username, TokenType.ACCESS_TOKEN);

        return new AuthenticationResponse(TokenType.ACCESS_TOKEN.name(), newAccessToken, TokenType.ACCESS_TOKEN.getTokenExpiration());
    }

    public void logout(HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        Cookie cookie = new Cookie(TokenType.REFRESH_TOKEN.toString(), null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public UserDTO getData(String refreshToken) {
        String username = tokenService.extractUsernameFromJWT(refreshToken);

        return userService.getUserDTO(username);
    }
}
