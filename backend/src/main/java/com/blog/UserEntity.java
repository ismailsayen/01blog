package com.blog;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "books")
@Entity
public class UserEntity {
    @Id
    Long id;
}
