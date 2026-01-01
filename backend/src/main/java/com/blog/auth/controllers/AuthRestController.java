package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserDTO;
import com.blog.auth.DTO.UserInfo;
import com.blog.auth.services.AuthService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthRestController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public UserDTO.UserOutput login(@RequestBody UserDTO.LoginData entity) throws AuthenticationException {
        
        return authService.verify(entity);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO.UserOutput register(@Valid @RequestBody UserDTO.RegisterInput entity)
            throws IllegalArgumentException {
        return authService.saveUser(entity);
    }

    @PostMapping("/isLogged")
    public UserDTO.UserOutput isAuth(@AuthenticationPrincipal UserInfo auth) {
        return UserDTO.UserOutput.builder()
                .id(auth.getId())
                .email(auth.getUser().getEmail())
                .userName(auth.getUser().getUserName())
                .role(auth.getUser().getRole())
                .createdAt(auth.getUser().getCreatedAt())
                .build();
    }

}
