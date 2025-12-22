package com.blog.user.model;

import java.time.LocalDateTime;

import com.blog.utils.DateNowFormatted;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String userName;

    @Column(unique = true)
    private String email;
    private String password;

    @Column(columnDefinition = "TIMESTAMP")
    private final LocalDateTime createdAt = DateNowFormatted.nowDateTime();
    private  String role ;


}
