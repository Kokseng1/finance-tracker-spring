package com.finance.tracker.config;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(jakarta.servlet.http.HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response,
                                        Authentication authentication) throws IOException, jakarta.servlet.ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"status\": \"success\"}");
        clearAuthenticationAttributes(request);
    }
}
