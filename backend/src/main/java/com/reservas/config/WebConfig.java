package com.reservas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Aplica a todas as rotas
                        .allowedOrigins("http://localhost:3000")  // Permite requisições do frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
                        .allowedHeaders("*")  // Permite todos os headers
                        .allowCredentials(true);  // Permite envio de cookies
            }
        };
    }
}