package com.blog.follow.services;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.follow.models.FollowEntity;
import com.blog.follow.repositories.FollowRepository;
import com.blog.user.model.UserEntity;
import com.blog.user.repositories.UserRepository;

@Transactional
@Service
public class FollowService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    FollowRepository followRepo;

    public String addOrDeleteFollow(Long followingId, UserInfo auth) throws BadRequestException {
        if (auth.getId().equals(followingId)) {
            throw new BadRequestException("You cannot follow yourself");
        }

        UserEntity following = userRepo.findById(followingId)
                .orElseThrow(() -> new NoSuchElementException("No Profile found."));
        UserEntity follower = userRepo.findById(auth.getId())
                .orElseThrow(() -> new NoSuchElementException("No Profile found."));

        Optional<FollowEntity> relation = followRepo.findByFollowerIdAndFollowingId(auth.getId(), followingId);

        if (relation.isPresent()) {
            followRepo.delete(relation.get());
            follower.setCountfollowing(dec(follower.getCountfollowing()));
            following.setCountfollowers(dec(following.getCountfollowers()));
            return "You Unfollowed " + following.getUserName();
        }

        followRepo.save(FollowEntity.builder()
                .follower(follower)
                .following(following)
                .build());

        follower.setCountfollowing(inc(follower.getCountfollowing()));
        following.setCountfollowers(inc(following.getCountfollowers()));
        return "You followed " + following.getUserName();
    }

    private long inc(Long v) {
        return v == null ? 1 : v + 1;
    }

    private long dec(Long v) {
        return v == null || v <= 0 ? 0 : v - 1;
    }
}
