package com.blog.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.blog.models.CommentEntity;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> {

}
