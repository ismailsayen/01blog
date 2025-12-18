package com.blog.blog.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.services.BlogService;

import jakarta.validation.Valid;

@RequestMapping("/blog")
@RestController
public class BlogController {
    @Autowired
    BlogService blgService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogDTO.BlogOutput addBlogController(@Valid @RequestBody BlogDTO.BlogInput input,
            @AuthenticationPrincipal UserInfo auth) {
        return blgService.addPostService(input, auth);
    }

    @GetMapping
    public List<BlogDTO.BlogOutput> getAllBlogController() {
        return blgService.getAllBlogs();
    }

    @GetMapping("/{idBlog}")
    public BlogDTO.BlogOutput getBLogById(@PathVariable Long idBlog) throws NoSuchElementException {
        return blgService.findBlogById(idBlog);
    }

    @DeleteMapping("/{idBlog}")
    @ResponseStatus(HttpStatus.OK)
    public String DeleteBlog(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth) throws ForbiddenAction {
        return blgService.DeletePost(idBlog, auth);
    }

    @PatchMapping("/{idBlog}")
    public String UpdateBlog(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth,
            @Valid @RequestBody BlogDTO.BlogInput input) throws ForbiddenAction {

        return blgService.updateBlog(idBlog, auth,input);
    }
}
