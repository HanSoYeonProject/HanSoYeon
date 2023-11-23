package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
    private int cosId;
    private String cosUserId;
    private String cosTitle;
    private String cosPicture;
    private String cosAddress;
}