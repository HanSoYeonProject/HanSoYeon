package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "review_number")
    private int reviewId;

    @Column(name = "comment_writer_id")
    private String userId;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_write_date")
    private LocalDateTime commentWriteDate;

    @Column(name = "user_type")
    private String userType;

    @PrePersist
    public void prePersist() {
        this.commentWriteDate = LocalDateTime.now();
    }

}
