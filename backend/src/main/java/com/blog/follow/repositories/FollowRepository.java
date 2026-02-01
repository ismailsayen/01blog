package com.blog.follow.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.follow.models.FollowEntity;
import com.blog.user.model.UserEntity;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    public Optional<FollowEntity> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

    @Query("""
              select f.follower
              from FollowEntity f
              where f.following.id = :id
            """)
    List<UserEntity> findFollowers(@Param("id") Long id);

}
