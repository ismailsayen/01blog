package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.services.AuthService;
import com.blog.user.DTO.UserDTO;
import com.blog.user.model.UserEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AuthRestController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody UserDTO.LoginData entity) {

        return authService.verify(entity);
    }

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity entity) {

        return authService.saveUser(entity);
    }

}
