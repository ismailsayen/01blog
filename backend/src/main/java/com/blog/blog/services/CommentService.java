package com.blog.blog.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO.DeletionResponse;
import com.blog.blog.DTO.CommentDTO;
import com.blog.blog.DTO.CommentDTO.CommentOutput;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.models.CommentEntity;
import com.blog.blog.models.Exception.ForbiddenAction;
import com.blog.blog.repositories.CommentRepo;
import com.blog.report.models.ReportTargetType;
import com.blog.report.repositories.ReportRepository;

@Transactional
@Service
public class CommentService {

    @Autowired
    BlogService blgService;

    @Autowired
    CommentRepo cmntRepo;

    @Autowired
    ReportRepository reportRepo;

    public CommentOutput addComment(CommentDTO.Create data, UserInfo auth) throws NoSuchElementException {
        BlogEntity blog = blgService.getBlogById(data.getBlogId());

        CommentEntity comment = CommentEntity.builder()
                .content(data.getContent())
                .BlogCommented(blog)
                .userComment(auth.getUser())
                .build();

        blog.setCommentsCount(blog.getCommentsCount() == null ? 1 : blog.getCommentsCount() + 1);
        cmntRepo.save(comment);
        return CommentOutput.builder()
                .blogId(data.getBlogId())
                .createdAt(comment.getCreatedAt())
                .id(comment.getId())
                .userId(auth.getId())
                .content(data.getContent())
                .userName(auth.getUsername())
                .avatar(auth.getUser().getAvatar())
                .build();
    }

    public DeletionResponse deleteComment(Long cmntId, UserInfo auth) throws NoSuchElementException, ForbiddenAction {
        CommentEntity comment = getComment(cmntId);
        if (!BlogService.isAdmin(auth.getAuthorities()) && !comment.getUserComment().getId().equals(auth.getId())) {
            throw new ForbiddenAction("You don't have the permission to do this action.");
        }
        BlogEntity blog = comment.getBlogCommented();
        blog.setCommentsCount(blog.getCommentsCount() == null ? 0
                : blog.getCommentsCount() - 1 < 0 ? 0 : blog.getCommentsCount() - 1);

        cmntRepo.delete(comment);
        reportRepo.deleteByTargetIdAndTargetType(cmntId, ReportTargetType.COMMENT);
        return DeletionResponse.builder().blogId(cmntId).action("comment deleted successfully.").build();
    }

    public CommentEntity getComment(Long id) {
        return cmntRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No Comment found."));
    }

    public List<CommentOutput> getComments(Long blogId, Long lastId) {
        return cmntRepo.findAllComments(blogId, lastId);
    }
}
