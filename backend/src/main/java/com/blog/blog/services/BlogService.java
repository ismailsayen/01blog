package com.blog.blog.services;

import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.blog.DTO.BlogDTO.UpdateResponse;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.repositories.BlogRepository;
import com.blog.report.models.ReportTargetType;
import com.blog.report.repositories.ReportRepository;
import com.blog.utils.DateNowFormatted;

@Transactional
@Service
public class BlogService {
    @Autowired
    BlogRepository blgRepo;
    @Autowired
    ReportRepository reportRepo;

    public BlogDTO.BlogOutput addPostService(BlogDTO.BlogInput input, UserInfo auth) {
        BlogEntity blgEnt = BlogEntity.builder()
                .title(input.getTitle())
                .commentsCount(0L)
                .likeCount(0L)
                .content(input.getContent())
                .categorie(input.getCategorie())
                .userBlog(auth.getUser())
                .build();
        blgRepo.save(blgEnt);

        return BlogDTO.BlogOutput.builder()
                .id(blgEnt.getId())
                .title(blgEnt.getTitle())
                .commentsCount(0L)
                .categorie(blgEnt.getCategorie())
                .likeCount(0L)
                .createdAt(blgEnt.getCreatedAt())
                .content(blgEnt.getContent())
                .userId(auth.getId())
                .userName(auth.getUsername())
                .job(auth.getUser().getJob())
                .avatar(auth.getUser().getAvatar())
                .build();
    }

    public List<BlogDTO.BlogOutput> getAllBlogs(Pageable pageable, long id) {
        return blgRepo.findAllData(id, pageable);
    }

    public BlogDTO.BlogUpdateOutput findBlogById(Long idBlog, Long idUser) throws NoSuchElementException {
        Optional<BlogDTO.BlogUpdateOutput> res = blgRepo.findBlogById(idBlog, idUser);

        if (res.isEmpty()) {
            throw new NoSuchElementException("No data found for the given blog ID.");
        }

        return res.get();
    }

    public BlogDTO.DeletionResponse DeleteBlog(Long idBlog, UserInfo auth) throws ForbiddenAction {

        BlogEntity blog = getBlogById(idBlog);
        if (!blog.getUserBlog().getId().equals(auth.getId()) && !isAdmin(auth.getAuthorities())) {
            throw new ForbiddenAction("You don't have the permission to do this action.");
        }

        blgRepo.delete(blog);
        reportRepo.deleteByTargetIdAndTargetType(blog.getId(), ReportTargetType.BLOG);
        return BlogDTO.DeletionResponse.builder().blogId(blog.getId()).action("the blog is deleted successfuly.")
                .build();
    }

    public UpdateResponse updateBlog(Long idBlog, UserInfo auth, BlogDTO.BlogInput data) throws ForbiddenAction {
        BlogEntity blog = getBlogById(idBlog);
        if (!blog.getUserBlog().getId().equals(auth.getId())) {
            throw new ForbiddenAction("You don't have the permission to do this action.");
        }
        blog.setTitle(data.getTitle());
        blog.setCategorie(data.getCategorie());
        blog.setContent(data.getContent());
        blog.setLastUpdateAt(DateNowFormatted.nowDateTime());
        blgRepo.save(blog);
        return UpdateResponse.builder().message("Updated Succesfully.").blogId(blog.getId()).build();
    }

    public static boolean isAdmin(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"));
    }

    public BlogEntity getBlogById(Long idBlog) throws NoSuchElementException {
        return blgRepo.findById(idBlog)
                .orElseThrow(() -> new NoSuchElementException("Blog not found."));
    }

    public List<BlogDTO.BlogOutput> getUserBlogs(Long idUser, Long id) {

        List<BlogDTO.BlogOutput> blogs = blgRepo.findBlogsById(idUser, id);
        return blogs;
    }

}
