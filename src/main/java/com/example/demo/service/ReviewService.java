package com.example.demo.service;

import com.example.demo.entity.ReviewEntity;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewEntity> findAllReviews() {
        return reviewRepository.findAll();
    }
}
