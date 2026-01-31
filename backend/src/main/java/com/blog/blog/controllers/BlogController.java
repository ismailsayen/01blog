package com.blog.blog.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.DTO.BlogDTO.UpdateResponse;
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

    @GetMapping("/user/{idUser}")
    public List<BlogDTO.BlogOutput> getMethodName(@PathVariable Long idUser, @AuthenticationPrincipal UserInfo auth) {
        return blgService.getUserBlogs(idUser, auth.getId());
    }

    @GetMapping
    public List<BlogDTO.BlogOutput> getAllBlogController(@RequestParam Long lastId,
            @AuthenticationPrincipal UserInfo auth) {
        return blgService.getAllBlogs(lastId, auth.getId());
    }

    @GetMapping("/{idBlog}")
    public BlogDTO.BlogUpdateOutput getBLogById(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth)
            throws NoSuchElementException {
        return blgService.findBlogById(idBlog, auth.getId());
    }

    @GetMapping("/public/{idBlog}")
    public BlogDTO.BlogOutput getAnyBlogById(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth) {
        return blgService.getAnyBlogById(idBlog, auth.getId());
    }

    @DeleteMapping("/{idBlog}")
    public BlogDTO.DeletionResponse DeleteBlog(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth)
            throws ForbiddenAction {
        return blgService.DeleteBlog(idBlog, auth);
    }

    @PatchMapping("/{idBlog}")
    public UpdateResponse UpdateBlog(@PathVariable Long idBlog, @AuthenticationPrincipal UserInfo auth,
            @Valid @RequestBody BlogDTO.BlogInput input) throws ForbiddenAction {
        return blgService.updateBlog(idBlog, auth, input);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/blogs")
    public List<BlogDTO.BlogsAdmin> getAllBlogsForAdmin() {
        return blgService.getAllBlogsForAdmin();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/Statiqueblogs")
    public BlogDTO.BlogsStatique getStatiqyue() {
        return blgService.getBlogStatique();
    }
}
