package com.blog.user.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.blog.blog.models.BlogEntity;
import com.blog.comment.models.CommentEntity;
import com.blog.utils.DateNowFormatted;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    private final String role = "user";

    @OneToMany(mappedBy = "userBlog", cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    private final Set<BlogEntity> blogs = new HashSet<>();

    @OneToMany(mappedBy = "userComment", cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    private final Set<CommentEntity> comments = new HashSet<>();

}
