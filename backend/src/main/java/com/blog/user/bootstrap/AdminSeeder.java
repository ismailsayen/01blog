package com.blog.user.bootstrap;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.blog.auth.repositories.AuthRepository;
import com.blog.user.model.UserEntity;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    @Autowired
    AuthRepository authRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Optional<UserEntity> admin = authRepo.findByRole("ADMIN");
        admin.ifPresentOrElse(System.out::println, () -> {
            UserEntity adminCreate = UserEntity.builder()
                    .userName("ismailSAYEN 02")
                    .email("ismailSayen02@gmail.com")
                    .password(encoder.encode("1234"))
                    .role("ADMIN")
                    .build();
            authRepo.save(adminCreate);
        });
    }
}
