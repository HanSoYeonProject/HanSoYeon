package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private int reviewId;
    private int jobId;
    private String reviewTitle;
    private String reviewContent;
    private String reviewImage;
    private String userId;
    private String reviewWriteDate;
    private int reviewClickCount;
    private int reviewLikeCount;
    private int reviewCommentCount;
}