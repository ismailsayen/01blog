package com.blog.auth.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.blog.auth.repositories.UserRepository;
import com.blog.auth.services.UserDetailsImpl;
import com.blog.user.model.UserEntity;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtService JwtService;
    @Autowired
    ApplicationContext context;
    @Autowired
    UserRepository authRepository;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    @SuppressWarnings("UseSpecificCatch")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getServletPath();
        if (requestURI.equals("/auth/login") || requestURI.equals("/auth/register")) {
            filterChain.doFilter(request, response);
            return;

        }
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new JwtException("JWT token is missing");
            }

            String token = authHeader.substring(7);
            String idUser = JwtService.extractId(token);
            UserEntity userEntity = authRepository.findById(Long.valueOf(idUser))
                    .orElseThrow(() -> new JwtException("Invalid credentials: email or password is incorrect."));
            UserDetails userDetails = context.getBean(UserDetailsImpl.class).loadUserByUsername(userEntity.getEmail());
            if (JwtService.validToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }
}
