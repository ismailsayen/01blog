package com.blog.auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.user.model.UserEntity;

@Repository
public interface AuthRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    Optional<UserEntity> findByRole(String role);

    @Query("SELECT u.id FROM UserEntity u WHERE u.email = :email")
    Long findIdByEmail(@Param("email") String email);
}
