package com.example.demo.dto;

import java.util.Date;

public class ReviewDto {
    private Long reviewId;
    private Long jobId;
    private String userId;
    private String reviewContent;
    private Date reviewDate;
    private int reviewRecommend;

    public ReviewDto(Long reviewId, Long jobId, String userId, String reviewContent, Date reviewDate, int reviewRecommend) {
        this.reviewId = reviewId;
        this.jobId = jobId;
        this.userId = userId;
        this.reviewContent = reviewContent;
        this.reviewDate = reviewDate;
        this.reviewRecommend = reviewRecommend;
    }

    public ReviewDto() {

    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getReviewContent() {
        return reviewContent;
    }

    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public int getReviewRecommend() {
        return reviewRecommend;
    }

    public void setReviewRecommend(int reviewRecommend) {
        this.reviewRecommend = reviewRecommend;
    }

}