package com.blog.blog.services;

import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.repositories.BlogRepository;
import com.blog.utils.DateNowFormatted;

@Transactional
@Service
public class BlogService {
    @Autowired
    BlogRepository blgRepo;

    public BlogDTO.BlogOutput addPostService(BlogDTO.BlogInput input, UserInfo auth) {
        BlogEntity blgEnt = BlogEntity.builder()
                .title(input.getTitle())
                .content(input.getContent())
                .userBlog(auth.getUser())
                .build();
        blgRepo.save(blgEnt);

        return BlogDTO.BlogOutput.builder()
                .id(blgEnt.getId())
                .title(blgEnt.getTitle())
                .commentsCount(0L)
                .likeCount(0L)
                .createdAt(blgEnt.getCreatedAt())
                .content(blgEnt.getContent())
                .userId(auth.getId())
                .userName(auth.getUsername())
                .build();
    }

    public List<BlogDTO.BlogOutput> getAllBlogs() {
        return blgRepo.findAllData();
    }

    public BlogDTO.BlogOutput findBlogById(Long idBlog) throws NoSuchElementException {
        Optional<BlogDTO.BlogOutput> res = blgRepo.findBlogById(idBlog);

        if (res.isEmpty()) {
            throw new NoSuchElementException("No data found for the given blog ID.");
        }
        return blgRepo.findBlogById(idBlog).get();
    }

    public String DeletePost(Long idBlog, UserInfo auth) throws ForbiddenAction {

        BlogEntity blog = getBlogById(idBlog);
        if (!blog.getUserBlog().getId().equals(auth.getId()) && !isAdmin(auth.getAuthorities())) {
            throw new ForbiddenAction("You don't have the permission to do this action.");
        }

        blgRepo.delete(blog);
        return "the blog is deleted successfuly.";
    }

    public String updateBlog(Long idBlog, UserInfo auth, BlogDTO.BlogInput data) throws ForbiddenAction {
        BlogEntity blog = getBlogById(idBlog);
        if (!blog.getUserBlog().getId().equals(auth.getId())) {
            throw new ForbiddenAction("You don't have the permission to do this action.");
        }
        blog.setTitle(data.getTitle());
        blog.setContent(data.getContent());
        blog.setLastUpdateAt(DateNowFormatted.nowDateTime());
        blgRepo.save(blog);
        return "Updated Succesfully.";
    }

    private boolean isAdmin(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .anyMatch(a -> a.getAuthority().equals("admin"));
    }

    private BlogEntity getBlogById(Long idBlog) throws NoSuchElementException {
        return blgRepo.findById(idBlog)
                .orElseThrow(() -> new NoSuchElementException("Blog not found."));
    }

}
