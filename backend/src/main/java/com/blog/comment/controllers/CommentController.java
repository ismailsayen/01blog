package com.blog.comment.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.comment.DTO.CommentDTO;
import com.blog.comment.services.CommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService cmntService;

    @PostMapping
    public String commentPost(@AuthenticationPrincipal UserInfo auth, @Valid @RequestBody CommentDTO.Create data) {
        System.out.println("-------------------------------------------> " + auth.getId());
        System.out.println("-------------------------------------------> " + data.getContent());
        return cmntService.addComment();
    }

}
