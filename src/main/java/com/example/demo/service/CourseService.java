package com.example.demo.service;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.CourseEntity;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseEntity addCourse(CourseDto courseDto) {
        CourseEntity courseEntity = new CourseEntity(courseDto);
        return courseRepository.save(courseEntity);
    }

    public void deleteCourseByTitle(String title) {
        courseRepository.deleteByCosTitle(title);
    }

    public boolean checkFavorite(String cosTitle, String userId) {
        return courseRepository.existsByCosTitleAndCosUserId(cosTitle, userId);
    }
}

