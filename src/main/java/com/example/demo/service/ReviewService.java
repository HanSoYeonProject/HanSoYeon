package com.example.demo.service;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.ReviewEntity;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 리뷰 추가
    public ReviewEntity addReview(ReviewEntity review) {
        return reviewRepository.save(review);
    }

    // 모든 리뷰 조회
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    // 특정 리뷰 조회
    public ReviewDto getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .map(this::convertEntityToDto)
                .orElse(null);
    }

    // 리뷰 수정
    public ReviewDto updateReview(Long reviewId, ReviewDto reviewDto) {
        return reviewRepository.findById(reviewId).map(reviewEntity -> {
            reviewEntity.setReviewContent(reviewDto.getReviewContent());
            // 여기에 추가 필드 업데이트 로직을 작성할 수 있습니다.
            return convertEntityToDto(reviewRepository.save(reviewEntity));
        }).orElse(null);
    }

    // 리뷰 삭제
    public boolean deleteReview(Long reviewId) {
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
            return true;
        }
        return false;
    }

    // Entity를 DTO로 변환
    private ReviewDto convertEntityToDto(ReviewEntity reviewEntity) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewId(reviewEntity.getReviewId());
        reviewDto.setJobId(reviewEntity.getJobId());
        reviewDto.setUserId(reviewEntity.getUserId());
        reviewDto.setReviewContent(reviewEntity.getReviewContent());
        reviewDto.setReviewDate(reviewEntity.getReviewDate());
        reviewDto.setReviewRecommend(reviewEntity.getReviewRecommend());
        // 기타 필드 변환
        return reviewDto;
    }
}