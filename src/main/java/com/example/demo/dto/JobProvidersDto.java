package com.example.demo.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
@ToString
public class JobProvidersDto {
    private int job_id;
    private String title;
    private String schedule;
    private String content;
    private String second;
    private String third;
    private String morning;
    private String lunch;
    private String dinner;
    private String background;
    private String need;
    private String region;
    private String address;
    private String providers;
    private Date startDate;
    private Date endDate;
    private List<String> image;
    private String money;

}