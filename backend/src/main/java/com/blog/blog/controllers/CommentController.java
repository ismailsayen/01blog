package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO.DeletionResponse;
import com.blog.blog.DTO.CommentDTO;
import com.blog.blog.DTO.CommentDTO.CommentOutput;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.services.CommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService cmntService;

    @PostMapping
    public CommentOutput commentPost(@Valid @RequestBody CommentDTO.Create data,
            @AuthenticationPrincipal UserInfo auth) {
        return cmntService.addComment(data, auth);
    }

    @GetMapping
    public List<CommentOutput> getMethodName(@RequestParam Long blogId, @RequestParam Long lastId,
            @AuthenticationPrincipal UserInfo auth) {
        return cmntService.getComments(blogId, lastId);
    }

    @DeleteMapping("/{cmntId}")
    public DeletionResponse deleteComment(@PathVariable Long cmntId, @AuthenticationPrincipal UserInfo auth)
            throws ForbiddenAction {
        return cmntService.deleteComment(cmntId, auth);

    }

}
