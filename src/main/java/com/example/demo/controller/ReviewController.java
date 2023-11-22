package com.example.demo.controller;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.ReviewEntity;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/") // React 앱이 실행 중인 주소
@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/reviews")
    public ResponseEntity<ReviewEntity> addReview(@RequestBody ReviewEntity review) {
        if (review.getReviewContent() == null || review.getReviewContent().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        ReviewEntity newReview = reviewService.addReview(review);
        return ResponseEntity.ok(newReview);
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // 특정 리뷰 조회
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable Long reviewId) {
        ReviewDto review = reviewService.getReviewById(reviewId);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 리뷰 수정
    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable Long reviewId, @RequestBody ReviewDto reviewDto) {
        ReviewDto updatedReview = reviewService.updateReview(reviewId, reviewDto);
        if (updatedReview != null) {
            return ResponseEntity.ok(updatedReview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // 리뷰 삭제
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        boolean isDeleted = reviewService.deleteReview(reviewId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}