package com.astu.ibolympapi.web;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class Web {
    private final List<String> allowedOrigins = List.of(
            "http://localhost:5173"
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
