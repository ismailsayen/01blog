package com.blog.user.bootstrap;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.blog.user.model.UserEntity;
import com.blog.user.repositories.UserRepository;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    @Autowired
    UserRepository authRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Optional<Long> adminID = authRepo.findByRole("ROLE_ADMIN");
        if (adminID.isPresent()) {
            System.out.println("ADMIN");
            return;
        }
        UserEntity adminCreate = UserEntity.builder()
                .userName("ismailSAYEN 02")
                .email("ismailSayen02@gmail.com")
                .password(encoder.encode("1234"))
                .role("ROLE_ADMIN")
                .banned(false)
                .job("------")
                .build();
        authRepo.save(adminCreate);
    }
}
