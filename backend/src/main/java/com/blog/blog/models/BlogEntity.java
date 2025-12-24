package com.blog.blog.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.blog.comment.models.CommentEntity;
import com.blog.user.model.UserEntity;
import com.blog.utils.DateNowFormatted;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "Blogs")
@Entity
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;
    private Long likeCount;
    private Long commentsCount;

    @Column(columnDefinition = "TIMESTAMP")
    private final LocalDateTime createdAt = DateNowFormatted.nowDateTime();

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime lastUpdateAt;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id",nullable=false)
    private UserEntity userBlog;

    @OneToMany(mappedBy = "BlogCommented", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private final Set<CommentEntity> comments = new HashSet<>();

    @OneToMany(mappedBy = "BlogCommented", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private final Set<CommentEntity> blogReacted = new HashSet<>();
}
