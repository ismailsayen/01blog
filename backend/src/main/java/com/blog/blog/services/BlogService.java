package com.blog.blog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.repositories.BlogRepository;

@Service
public class BlogService {
    @Autowired
    BlogRepository blgRepo;

    public String addPostService(BlogDTO.BlogInput input, UserInfo user) {
        BlogEntity blgEnt = BlogEntity.builder()
                .title(input.getTitle())
                .content(input.getTitle())
                .users(user.getUser())
                .build();
        blgRepo.save(blgEnt);
        return "0L";
    }
}
