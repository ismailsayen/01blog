package com.blog.comment.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.services.BlogService;
import com.blog.comment.DTO.CommentDTO;
import com.blog.comment.models.CommentEntity;
import com.blog.comment.repositories.CommentRepo;

@Transactional
@Service
public class CommentService {

    @Autowired
    BlogService blgService;

    @Autowired
    CommentRepo cmntRepo;

    public String addComment(CommentDTO.Create data, UserInfo auth) throws NoSuchElementException {
        BlogEntity blog = blgService.getBlogById(data.getBlogId());

        CommentEntity comment = CommentEntity.builder()
                .content(data.getContent())
                .BlogCommented(blog)
                .userComment(auth.getUser())
                .build();

        blog.setCommentsCount(blog.getCommentsCount() == null ? 1 : blog.getCommentsCount() + 1);
        cmntRepo.save(comment);
        return "comment added successfully";
    }

    public String deleteComment(Long cmntId, UserInfo auth) throws NoSuchElementException,ForbiddenAction {
        CommentEntity comment = cmntRepo.findById(cmntId)
                .orElseThrow(() -> new NoSuchElementException("No comment found."));
        if (!BlogService.isAdmin(auth.getAuthorities()) && !comment.getUserComment().getId().equals(auth.getId())) {
             throw new ForbiddenAction("You don't have the permission to do this action.");
        }
        BlogEntity blog = comment.getBlogCommented();
        blog.setCommentsCount(blog.getCommentsCount() == null ? 0
                : blog.getCommentsCount() - 1 < 0 ? 0 : blog.getCommentsCount() - 1);

        cmntRepo.delete(comment);
        return "comment deleted successfully.";
    }

}
