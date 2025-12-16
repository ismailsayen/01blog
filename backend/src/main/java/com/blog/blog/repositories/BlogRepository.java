package com.blog.blog.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.models.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    @Query(value = "SELECT b.*, u.user_name FROM blogs b INNER JOIN users u ON b.user_id=u.id", nativeQuery = true)
    List<BlogDTO.BlogOutput> findAllData();

    @Query(value = "SELECT b.*, u.user_name FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE b.id=:id", nativeQuery = true)
    Optional<BlogDTO.BlogOutput> findBlogById(@Param("id") Long id);
}
