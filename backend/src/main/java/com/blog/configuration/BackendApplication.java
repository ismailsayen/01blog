package com.blog.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan({ "com.blog.user.model", "com.blog.blog.models", "com.blog.comment.models", "com.blog.reaction.models",
		"com.blog.report.models" })
@EnableJpaRepositories(basePackages = { "com.blog.auth.repositories", "com.blog.blog.repositories",
		"com.blog.comment.repositories", "com.blog.reaction.repositories" })
@SpringBootApplication(scanBasePackages = {
		"com", "com.blog"
})

public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
