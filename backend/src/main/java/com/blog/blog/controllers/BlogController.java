package com.blog.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.services.BlogService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BlogController {
    @Autowired
    BlogService blgService;

    @PostMapping("/addPost")
    public String addPostController(@Valid @RequestBody BlogDTO.BlogInput input,
            @AuthenticationPrincipal UserInfo user) {

        return blgService.addPostService(input,user);
    }
}
