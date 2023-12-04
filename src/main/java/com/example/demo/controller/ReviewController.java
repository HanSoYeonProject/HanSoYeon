package com.example.demo.controller;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.ReviewEntity;
import com.example.demo.service.ImageService;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // React 앱이 실행 중인 주소
@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ImageService imageService;

    @PostMapping("/reviews")
    public ResponseEntity<ReviewEntity> addReview(@RequestBody ReviewEntity review) {
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewEntity>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // 특정 리뷰 조회
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewEntity> getReviewById(@PathVariable int reviewId) {
        return reviewService.getReviewById(reviewId)
                .map(review -> ResponseEntity.ok(review))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 리뷰 수정
    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewEntity> updateReview(@PathVariable int reviewId,
                                                     @RequestPart("reviewTitle") String reviewTitle,
                                                     @RequestPart("reviewContent") String reviewContent,
                                                     @RequestPart(value = "reviewImage", required = false) MultipartFile reviewImage) {
        ReviewEntity existingReview = reviewService.getReviewById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰 없음"));

        try {
            // 이미지가 요청에 포함되어 있다면 업로드하고 URL을 가져온다.
            if (reviewImage != null && !reviewImage.isEmpty()) {
                String imageUrl = uploadImage(reviewImage);
                existingReview.setReviewImage(imageUrl);
            }

            // 기존 게시글 데이터를 업데이트한다.
            existingReview.setReviewTitle(reviewTitle);
            existingReview.setReviewContent(reviewContent);

            return ResponseEntity.ok(reviewService.saveReview(existingReview));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String uploadImage(MultipartFile file) throws IOException {  // uploadImage 메서드 추가
        return imageService.uploadImage(file);
    }


    // 리뷰 삭제
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReviewById(reviewId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createReview")
    public ResponseEntity<Map<String, Boolean>> createPost(@ModelAttribute ReviewDto reviewDto,
                                                           @RequestPart(value = "postImage", required = false) MultipartFile postImage) {
        try {
            if (postImage != null && !postImage.isEmpty()) {
                String imageUrl = uploadImage(postImage);
                reviewDto.setReviewImage(imageUrl);
            }

            reviewService.createPost(reviewDto);

            Map<String, Boolean> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Boolean> response = new HashMap<>();
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/reviews/{reviewId}/incrementView")
    public ResponseEntity<Void> incrementViewCount(@PathVariable int reviewId) {
        reviewService.incrementViewCount(reviewId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reviews/{reviewId}/incrementLike")
    public ResponseEntity<Void> incrementLikeCount(@PathVariable int reviewId) {
        reviewService.incrementLikeCount(reviewId);
        return ResponseEntity.ok().build();
    }

}