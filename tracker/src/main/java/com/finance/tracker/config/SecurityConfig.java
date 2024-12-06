package com.finance.tracker.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .csrf((csrf) -> csrf.disable())
        // .cors(customizer -> customizer.configurationSource(corsConfigurationSource()))
        .exceptionHandling(customizer -> customizer.authenticationEntryPoint(unauthorizedEntryPoint())) 
        .authorizeHttpRequests((requests) -> requests
            .requestMatchers(HttpMethod.POST, "/login", "/register", "/error").permitAll()
            .anyRequest().authenticated())        
        .formLogin(customizer -> customizer
            .loginProcessingUrl("/login")
            .successHandler(new CustomAuthenticationSuccessHandler())
            .failureHandler(new CustomAuthenticationFailuresHandler()));

        return http.build();
    }

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Allow the frontend's origin
    //     configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // Allow the methods needed
    //     configuration.setAllowCredentials(true); // Allow sending credentials (cookies)
    //     configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "X-Requested-With")); // Set allowed headers

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }

    @Bean
    public AuthenticationEntryPoint unauthorizedEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED); // Respond with 401 Unauthorized
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
