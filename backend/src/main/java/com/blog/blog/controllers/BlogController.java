package com.blog.blog.controllers;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BlogController {
    @PostMapping("/addPost")
    public String postMethodName(Authentication authentication) {

        System.out.println(authentication.getName());
        return "Hello for post Handler";
    }
}
