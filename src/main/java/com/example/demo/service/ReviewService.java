package com.example.demo.service;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.ReviewEntity;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 게시글 목록 불러오기
    public List<ReviewEntity> getAllReviews(){
        return reviewRepository.findAll();
    }

    public Optional<ReviewEntity> getReviewById(int reviewId){
        return reviewRepository.findById(reviewId);
    }

    public ReviewEntity saveReview(ReviewEntity review){
        return reviewRepository.save(review);
    }

    public void deleteReviewById(int reviewId){
        reviewRepository.deleteById(reviewId);
    }

    public void createPost(ReviewDto reviewDto){
        ReviewEntity review = new ReviewEntity();
        review.setJobId(reviewDto.getJobId());
        review.setReviewTitle(reviewDto.getReviewTitle());
        review.setReviewContent(reviewDto.getReviewContent());
        review.setReviewImage(reviewDto.getReviewImage());
        review.setUserId(reviewDto.getUserId());
        review.setReviewWriteDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        review.setReviewClickCount(reviewDto.getReviewClickCount());
        review.setReviewLikeCount(reviewDto.getReviewLikeCount());
        review.setReviewCommentCount(reviewDto.getReviewCommentCount());
        System.out.println(review);
        reviewRepository.save(review);
    }

    public void incrementViewCount(int reviewId){
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰 못 찾음"));
        review.setReviewClickCount(review.getReviewClickCount()+1);
        reviewRepository.save(review);
    }

    public void incrementLikeCount(int reviewId){
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰 못 찾음"));
        review.setReviewLikeCount(review.getReviewLikeCount()+1);
        reviewRepository.save(review);
    }

    public Optional<ReviewEntity> getReviewEntityById(int reviewId){
        return reviewRepository.findById(reviewId);
    }
}