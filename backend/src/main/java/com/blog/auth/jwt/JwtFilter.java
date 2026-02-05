package com.blog.auth.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.blog.auth.DTO.UserInfo;
import com.blog.user.model.UserEntity;
import com.blog.user.model.exception.BanneException;
import com.blog.user.repositories.UserRepository;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtService JwtService;
    @Autowired
    UserRepository authRepository;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    @SuppressWarnings("UseSpecificCatch")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getServletPath();
        if (requestURI.equals("/auth/login") || requestURI.equals("/auth/register")
                || requestURI.equals("/uploadMedia")) {
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
            System.out.println("----------------JwtFilter--------------");
            if (userEntity.getBanned()) {
                throw new BanneException("Your account has been banned.");
            }
            UserDetails userDetails = new UserInfo(userEntity);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                    null,
                    userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } catch (JwtException | BanneException e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }
}
