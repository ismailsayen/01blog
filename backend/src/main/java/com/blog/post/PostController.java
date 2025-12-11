package com.blog.post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
public class PostController {
    @GetMapping("/addPost")
    public String postMethodName() {
        log.info("msg");
        return "Hello for post Handler";
    }
}
