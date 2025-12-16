package com.blog.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.models.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    @Query(value = "SELECT b.* FROM blogs b",nativeQuery=true)
    List<BlogDTO.BlogOutput> findAllData();
}
