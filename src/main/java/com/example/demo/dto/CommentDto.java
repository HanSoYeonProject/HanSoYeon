package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private int commentId;
    private int reviewId;
    private String userId;
    private String commentContent;
    private String commentWriteDate;
    private String userType;
}
