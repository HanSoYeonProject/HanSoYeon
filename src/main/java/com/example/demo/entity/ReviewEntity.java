package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="comment_reviews")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "job_id", nullable = false)
    private Long jobId;

    @Column(name = "user_id", nullable = false, length = 100)
    private String userId;

    @Column(name = "review_content", nullable = false, columnDefinition = "TEXT")
    private String reviewContent;

    @Column(name = "review_date", nullable = false)
    private Date reviewDate;

    @Column(name = "review_recommend", nullable = false)
    private int reviewRecommend;

    public ReviewEntity(Long reviewId, Long jobId, String userId, String reviewContent, Date reviewDate, int reviewRecommend) {
        this.reviewId = reviewId;
        this.jobId = jobId;
        this.userId = userId;
        this.reviewContent = reviewContent;
        this.reviewDate = reviewDate;
        this.reviewRecommend = reviewRecommend;
    }

    public ReviewEntity() {

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