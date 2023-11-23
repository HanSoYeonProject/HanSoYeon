package com.example.demo.entity;

import com.example.demo.dto.CourseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Course")
@Table(name = "Course")
public class CourseEntity {
    @Id
    private int cosId;
    private String cosUserId;
    private String cosTitle;
    private String cosPicture;
    private String cosAddress;

    public CourseEntity(CourseDto courseDto) {
        this.cosId = courseDto.getCosId();
        this.cosUserId = courseDto.getCosUserId();
        this.cosTitle = courseDto.getCosTitle();
        this.cosPicture = courseDto.getCosPicture();
        this.cosAddress = courseDto.getCosAddress();
    }
}