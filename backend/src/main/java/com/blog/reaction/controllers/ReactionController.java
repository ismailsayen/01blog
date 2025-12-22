package com.blog.reaction.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import com.blog.auth.DTO.UserInfo;
import com.blog.reaction.services.ReactionService;

@RestController
@RequestMapping("/reaction")
public class ReactionController {

    @Autowired
    ReactionService rctService;

    @PostMapping("/{blogId}")
    public String addOrDeleteReaction(@PathVariable Long blogId,@AuthenticationPrincipal UserInfo auth) {
        return rctService.addOrDeleteReaction(blogId,auth);
    }
    
}
