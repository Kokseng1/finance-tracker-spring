package com.finance.tracker.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import jakarta.servlet.Filter;

@Configuration
@EnableWebMvc
public class WebConfig {

        @Bean
        public FilterRegistrationBean<Filter> corsFilter() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowCredentials(true);
            config.addAllowedOrigin("http://localhost:3000");
            // config.addAllowedOriginPattern("*");
            config.setAllowedHeaders((Arrays.asList(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE, HttpHeaders.ACCEPT)));
            config.setAllowedMethods(Arrays.asList(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()));
            config.setMaxAge(3600L);
            source.registerCorsConfiguration("/**", config);
            FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<Filter>(new CorsFilter(source));
            bean.setOrder(-102);
            return bean;
        }
}
