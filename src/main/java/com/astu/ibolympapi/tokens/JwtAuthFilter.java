package com.astu.ibolympapi.tokens;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.user.entities.User;
import com.astu.ibolympapi.user.services.UserService;
import com.astu.ibolympapi.web.Web;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Service
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final TokenService tokenService;
    private final Web web;
    private static final List<String> ALLOWED_PATHS = List.of(
            "/api/v1/auth",
            "api/v1/test",
            "/v2/api-docs",
            "/actuator",
            "/error",
            "/v3/api-docs",
            "/swagger-resources",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui",
            "/webjars",
            "/swagger-ui.html",
            "/ws/**",
            "/ws/info",
            "/ws"
    );


    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (isRequestAllowedWithoutAuthentication(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String jwt = extractJwtFromRequest(request);
            String username = tokenService.extractUsernameFromJWT(jwt);
            authenticateUserIfNecessary(username, jwt, request);
        } catch (JWTVerificationException e) {
            throw new BadRequestException(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        filterChain.doFilter(request, response);
    }

    private boolean isRequestAllowedWithoutAuthentication(HttpServletRequest request) {
        String requestPath = request.getServletPath();
        return ALLOWED_PATHS.stream().anyMatch(requestPath::contains);
    }

    private void authenticateUserIfNecessary(String username, String jwt, HttpServletRequest request) {
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User userDetails = userService.findByUsername(username).orElseThrow();
            if (tokenService.validateToken(jwt)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
