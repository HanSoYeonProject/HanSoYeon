package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="reviews")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_number")
    private int reviewId;

    @Column(name = "job_id")
    private int jobId;

    @Column(name = "review_title")
    private String reviewTitle;

    @Column(name = "review_content")
    private String reviewContent;

    @Column(name = "review_image")
    private String reviewImage;

    @Column(name = "review_writer_id")
    private String userId;

    @Column(name = "review_write_date")
    private String reviewWriteDate;

    @Column(name = "review_click_count")
    private int reviewClickCount;

    @Column(name = "review_like_count")
    private int reviewLikeCount;

    @Column(name = "review_comment_count")
    private int reviewCommentCount;

}