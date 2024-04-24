package com.astu.ibolympapi.auth.services;

import com.astu.ibolympapi.auth.dto.AuthenticationResponse;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.tokens.TokenService;
import com.astu.ibolympapi.tokens.TokenType;
import com.astu.ibolympapi.user.dto.SignInRequest;
import com.astu.ibolympapi.user.dto.SignUpRequest;
import com.astu.ibolympapi.user.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
public class AuthService {
    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public void signUp(SignUpRequest request) {
        userService.save(request);
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
        //TODO: create activate func
    }
}
