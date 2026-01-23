package com.blog.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.user.DTO.UserDTO.ProfileOutput;
import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    @Query("SELECT u.id FROM UserEntity u WHERE u.role = :role")
    Optional<Long> findByRole(@Param("role") String role);

    @Query(value = "SELECT u.id, u.user_name, u.job, u.avatar, EXISTS(SELECT 1 FROM follows f WHERE f.follower_id=:id AND f.following_id=u.id) as followed FROM users u WHERE u.user_name ILIKE '%' || :name || '%' AND u.id<>:id", nativeQuery = true)
    List<SearchedUsers> findByUserName(@Param("name") String name, @Param("id") Long id);

    @Query(value = "SELECT u.id, u.user_name, u.job, u.avatar, (false) as followed FROM users u WHERE u.id<>:id AND NOT EXISTS (SELECT f.follower_id FROM follows f WHERE f.follower_id=:id AND f.following_id=u.id )  ORDER BY created_at DESC LIMIT 5", nativeQuery = true)
    List<SearchedUsers> findSuggestedProfiles(@Param("id") Long id);

    @Query(value = "SELECT u.id, u.user_name, u.job, u.avatar, u.countfollowers,  u.countfollowing, EXISTS(SELECT 1 FROM follows f WHERE f.follower_id=:userId AND f.following_id=u.id) as followed, (:id=:userId) as MyAccount FROM users u WHERE u.id=:id", nativeQuery = true)
    Optional<ProfileOutput> findProfileId(@Param("id") Long id, @Param("userId") Long userId);

}
