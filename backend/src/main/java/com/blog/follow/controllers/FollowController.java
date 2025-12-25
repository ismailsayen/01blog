package com.blog.follow.controllers;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.follow.services.FollowService;

@RestController
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    FollowService followService;

    @PostMapping("/{followingId}")
    public String postMethodName(@PathVariable Long followingId, @AuthenticationPrincipal UserInfo auth)
            throws BadRequestException {
        return followService.addOrDeleteFollow(followingId, auth);
    }

}
