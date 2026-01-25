package com.blog.blog.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.DTO.BlogDTO.BlogOutput;
import com.blog.blog.models.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    @Query(value = "SELECT b.id, b.title, b.content, b.categorie FROM blogs b WHERE b.id=:id AND b.user_id=:user_id", nativeQuery = true)
    Optional<BlogDTO.BlogUpdateOutput> findBlogById(@Param("id") Long id, @Param("user_id") Long user_id);

    @Query(value = "SELECT b.*, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM reactions r WHERE r.user_id=:id AND b.id=r.blog_id) as liked, (b.user_id=:id) AS myBlog FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE b.user_id IN (SELECT following_id FROM follows WHERE  follower_id =:id)", nativeQuery = true)
    List<BlogDTO.BlogOutput> findAllData(@Param("id") Long id, Pageable pageable);

    @Query(value = "SELECT b.*, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM reactions r WHERE r.user_id=:id AND b.id=r.blog_id) as liked , (:id=:idUser) AS myBlog FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE  b.user_id=:idUser ORDER BY b.created_at DESC", nativeQuery = true)
    List<BlogOutput> findBlogsById(Long idUser, Long id);
}
