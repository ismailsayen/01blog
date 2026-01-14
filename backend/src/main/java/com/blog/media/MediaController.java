package com.blog.media;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class MediaController {
    @PostMapping("/uploadMedia")
    public String UploadMedia(@RequestParam("file") MultipartFile file) {
        System.out.println(file.getName());
        return "salam O 3alikom";
    }

}
