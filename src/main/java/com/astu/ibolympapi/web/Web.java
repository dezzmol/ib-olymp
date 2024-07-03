package com.astu.ibolympapi.web;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
@RequiredArgsConstructor
public class Web {
    @Value("spring.client.url")
    private String clientUrl;

    private final List<String> allowedOrigins = List.of(
            "http://astuctf.ru",
            "http://localhost"
    );

    private final List<String> allowedPaths = List.of(
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
            "/swagger-ui/index.html"
    );
}
