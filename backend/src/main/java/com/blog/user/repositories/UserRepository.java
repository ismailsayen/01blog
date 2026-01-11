package com.blog.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    @Query("SELECT u.id FROM UserEntity u WHERE u.role = :role")
    Optional<Long> findByRole(@Param("role") String role);

    @Query(value = "SELECT u.id, u.user_name, u.job FROM users u WHERE u.user_name ILIKE '%' || :name || '%' AND u.id<>:id", nativeQuery = true)
    List<SearchedUsers> findByUserName(@Param("name") String name, @Param("id") Long id);

}
