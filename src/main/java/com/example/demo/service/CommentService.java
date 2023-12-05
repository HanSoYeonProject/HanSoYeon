package com.example.demo.service;

import com.example.demo.entity.CommentEntity;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<CommentEntity> findCommentsByReviewId(int reviewId){
        return commentRepository.findByReviewId(reviewId);
    }

    @Transactional
    public CommentEntity save(CommentEntity comment) {
        return commentRepository.save(comment);
    }
}
