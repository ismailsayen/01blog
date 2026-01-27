package com.blog.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.blog.DTO.CommentDTO.CommentOutput;
import com.blog.blog.models.CommentEntity;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> {

    @Query(value = "SELECT c.*, u.user_name, u.avatar FROM comments c INNER JOIN users u ON c.user_id=u.id WHERE c.blog_id =:blogId AND ((:lastId = 0) OR (c.id < :lastId)) ORDER BY c.created_at DESC LIMIT 5", nativeQuery = true)
    List<CommentOutput> findAllComments(@Param("blogId") Long blogId, @Param("lastId") Long lastId);

}
