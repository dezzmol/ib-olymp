package com.astu.ibolympapi.config;

import com.astu.ibolympapi.exceptions.handlers.UserNotEnabledExceptionHandler;
import com.astu.ibolympapi.tokens.JwtAuthFilter;
import com.astu.ibolympapi.user.enums.Role;
import com.astu.ibolympapi.web.Web;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
    private final Web web;
    private final UserNotEnabledExceptionHandler userNotEnabledExceptionHandler;
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authProvider;
    private static final String[] ALLOWED_PATHS = {
//            "/email/**",
            "/api/v1/auth/**",
            "/v2/api-docs",
            "/actuator/**",
            "/error",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/ws/info",
            "/ws/**",
            "/ws",
            "/"};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
                    corsConfiguration.setAllowedOriginPatterns(web.getAllowedOrigins());
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                    corsConfiguration.setAllowCredentials(true);
                    corsConfiguration.setExposedHeaders(List.of("Authorization"));
                    return corsConfiguration;

                }))
                .authorizeHttpRequests(auth -> auth.requestMatchers(ALLOWED_PATHS)
                        .permitAll()
                        .requestMatchers("/api/v1/student").hasAuthority(Role.ROLE_STUDENT.name())
                        .requestMatchers("/api/v1/olymp").hasAuthority(Role.ROLE_OLYMPIAD_ADMIN.name())
                        .requestMatchers("/api/v1/estimate").hasAuthority(Role.ROLE_INSPECTOR.name())
                        .requestMatchers("/api/v1/admin").hasAuthority(Role.ROLE_ADMIN.name())
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)

                .exceptionHandling(exc -> exc.authenticationEntryPoint(userNotEnabledExceptionHandler))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout"))
                .build();
    }
}
