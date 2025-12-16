package com.blog.user.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.blog.blog.models.BlogEntity;

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
    @Column(columnDefinition = "date")
    private final LocalDate createdAt = LocalDate.now();
    private final String role = "user";
    
    @OneToMany(mappedBy = "user", cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    private final Set<BlogEntity> blogs = new HashSet<>();

}
