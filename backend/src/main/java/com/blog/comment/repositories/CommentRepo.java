package com.blog.comment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.comment.models.CommentEntity;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> {

}
