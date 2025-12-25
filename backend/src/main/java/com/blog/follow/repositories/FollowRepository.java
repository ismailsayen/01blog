package com.blog.follow.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.follow.models.FollowEntity;

public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    public Optional<FollowEntity> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

}
