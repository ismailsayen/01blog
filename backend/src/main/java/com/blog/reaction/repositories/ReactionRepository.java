package com.blog.reaction.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.reaction.models.ReactionEntity;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {
    Optional<ReactionEntity> findByBlogReacted_IdAndUserReacted_Id(
            Long blogId,
            Long userId);

}
