package com.blog.blog.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.DTO.BlogDTO.BlogOutput;
import com.blog.blog.DTO.BlogDTO.BlogsAdmin;
import com.blog.blog.DTO.BlogDTO.BlogsStatique;
import com.blog.blog.models.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    @Query(value = "SELECT b.id, b.title, b.content, b.categorie FROM blogs b WHERE b.id=:id AND b.user_id=:user_id AND b.hide=FALSE;", nativeQuery = true)
    Optional<BlogDTO.BlogUpdateOutput> findBlogById(@Param("id") Long id, @Param("user_id") Long user_id);

    @Query(value = "SELECT b.*, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM reactions r WHERE r.user_id=:id AND b.id=r.blog_id) as liked, (b.user_id=:id) AS myBlog FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE b.user_id IN (SELECT following_id FROM follows WHERE  follower_id =:id) AND ((:lastId = 0) OR (b.id < :lastId)) AND b.hide=FALSE ORDER BY b.created_at DESC LIMIT 5", nativeQuery = true)
    List<BlogDTO.BlogOutput> findAllData(@Param("id") Long id, @Param("lastId") Long lastId);

    @Query(value = "SELECT b.*, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM reactions r WHERE r.user_id=:id AND b.id=r.blog_id) as liked , (:id=:idUser) AS myBlog FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE  b.user_id=:idUser AND b.hide=FALSE ORDER BY b.created_at DESC", nativeQuery = true)
    List<BlogOutput> findBlogsById(Long idUser, Long id);

    @Query(value = "SELECT b.*, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM reactions r WHERE r.user_id=:id AND b.id=r.blog_id) as liked , (b.user_id=:id) AS myBlog FROM blogs b INNER JOIN users u ON b.user_id=u.id WHERE  b.id=:idBlog AND b.hide=FALSE ORDER BY b.created_at DESC", nativeQuery = true)
    Optional<BlogOutput> findAnyBlogById(@Param("idBlog") Long idBlog, @Param("id") Long id);

    @Query(value = "SELECT b.id, b.title, b.created_at, b.hide, u.user_name FROM blogs b INNER JOIN users u ON b.user_id=u.id ORDER BY b.created_at ", nativeQuery = true)
    List<BlogsAdmin> findAllBlogsForAdmin();

    @Query(value = " SELECT (SELECT COUNT(*) FROM blogs) AS blogsCount, (SELECT COUNT(*) FROM blogs WHERE hide=FALSE) AS activeCount, (SELECT COUNT(*) FROM blogs WHERE hide=TRUE) AS hiddenCount", nativeQuery = true)
    BlogsStatique fingBlogsStatiques();

}
