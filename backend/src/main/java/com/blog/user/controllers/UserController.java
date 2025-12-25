package com.blog.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.repositories.UserRepository;
import com.blog.user.model.UserEntity;

@RestController
@RequestMapping("/profile")
public class UserController {
    @Autowired
    UserRepository userRepo;

    @GetMapping("/{id}")
    public UserEntity getMethodName(@PathVariable Long id) {
        return userRepo.findById(id).get();
    }

}
