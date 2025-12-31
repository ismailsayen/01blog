package com.blog.blog.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.models.ReactionEntity;
import com.blog.blog.repositories.ReactionRepository;

@Transactional
@Service
public class ReactionService {
    @Autowired
    ReactionRepository rctRepo;
    @Autowired
    BlogService blgService;

    public String addOrDeleteReaction(Long blogId, UserInfo auth) {
        BlogEntity blog = blgService.getBlogById(blogId);
        Optional<ReactionEntity> reaction = rctRepo.findByBlogReacted_IdAndUserReacted_Id(blogId, auth.getId());
        if (!reaction.isPresent()) {
            ReactionEntity newReaction = ReactionEntity.builder()
                    .blogReacted(blog)
                    .userReacted(auth.getUser())
                    .build();
            rctRepo.save(newReaction);
            blog.setLikeCount(blog.getLikeCount() == null ? 1 : blog.getLikeCount() + 1);
            return "You liked";
        }
        rctRepo.delete(reaction.get());
        blog.setLikeCount(blog.getLikeCount() == null ? 0 : blog.getLikeCount() - 1 < 0 ? 0 : blog.getLikeCount() - 1);
        return "You disliked";
    }

}
