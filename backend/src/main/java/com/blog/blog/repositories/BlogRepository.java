package com.blog.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.blog.models.BlogEntity;

@Repository
public interface  BlogRepository extends JpaRepository<BlogEntity, Long> {
    
}
