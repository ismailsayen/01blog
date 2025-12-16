package com.blog.blog.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public BlogDTO.BlogOutput addPostService(BlogDTO.BlogInput input, UserInfo user) {
        BlogEntity blgEnt = BlogEntity.builder()
                .title(input.getTitle())
                .content(input.getContent())
                .user(user.getUser())
                .build();
        blgRepo.save(blgEnt);

        return BlogDTO.BlogOutput.builder()
                .id(blgEnt.getId())
                .title(blgEnt.getTitle())
                .commentsCount(0L)
                .likeCount(0L)
                .createdAt(blgEnt.getCreatedAt())
                .content(blgEnt.getContent())
                .userId(user.getId())
                .userName(user.getUsername())
                .build();
    }

    public List<BlogDTO.BlogOutput> getAllBlogs() {
        return blgRepo.findAllData();
    }

    public BlogDTO.BlogOutput findBlogById(Long idBlog) throws NoSuchElementException {
        Optional<BlogDTO.BlogOutput> res = blgRepo.findBlogById(idBlog);

        if (res.isEmpty()) {
            throw new NoSuchElementException("NO data.");
        }
        return blgRepo.findBlogById(idBlog).get();
    }

    public String DeletePost(Long idBlog) {
        blgRepo.deleteById(idBlog);
        return "the blog is deleted successfuly.";
    }
}
