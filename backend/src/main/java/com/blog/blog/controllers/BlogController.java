package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.services.BlogService;

import jakarta.validation.Valid;

@RequestMapping("/post")
@RestController
public class BlogController {
    @Autowired
    BlogService blgService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogDTO.BlogOutput addPostController(@Valid @RequestBody BlogDTO.BlogInput input,
            @AuthenticationPrincipal UserInfo user) {
        return blgService.addPostService(input, user);
    }

    @GetMapping
    public List<BlogDTO.BlogOutput> getPostController() {
        return blgService.getAllPosts();
    }
}
