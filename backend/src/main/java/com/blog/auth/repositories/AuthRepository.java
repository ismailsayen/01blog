package com.blog.auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.user.model.UserEntity;

@Repository
public interface AuthRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
}
