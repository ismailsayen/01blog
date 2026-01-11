package com.blog.user.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.model.UserEntity;
import com.blog.user.services.UserServices;

@RestController
@RequestMapping("/profile")
public class UserController {
    @Autowired
    UserServices userServices;

    @GetMapping("/{id}")
    public UserEntity getMethodName(@PathVariable Long id) {
        return userServices.getProfile(id);
    }

    @GetMapping("/search")
    public  List<SearchedUsers> getProfiles(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String name, @AuthenticationPrincipal UserInfo auth) {

        Sort sort = Sort.by("user_name").descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userServices.getProfiles(pageable, name, auth.getId());
    }

}
