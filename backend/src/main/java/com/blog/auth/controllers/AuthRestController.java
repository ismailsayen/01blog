package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserDTO;
import com.blog.auth.services.AuthService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController("/")
public class AuthRestController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public String login(@RequestBody UserDTO.LoginData entity) throws AuthenticationException {
        return authService.verify(entity);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO.RegisterOutput register(@Valid @RequestBody UserDTO.RegisterInput entity) throws  IllegalArgumentException {
        return authService.saveUser(entity);
    }

}
