package com.example.demo.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
@ToString
public class JobProvidersDto {
    private int job_id;
    private String title;
    private String content;
    private String region;
    private String address;
    private String providers;
    private Date startDate;
    private Date endDate;
    private String image;
    private String money;
}