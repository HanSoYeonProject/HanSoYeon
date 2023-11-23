package com.example.demo.service;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.CourseEntity;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseEntity addCourse(CourseDto courseDto) {
        CourseEntity courseEntity = new CourseEntity(courseDto);
        return courseRepository.save(courseEntity);
    }

    public boolean checkFavorite(String cosTitle, String userId) {
        return courseRepository.existsByCosTitleAndCosUserId(cosTitle, userId);
    }

    @Transactional
    public void deleteCourse(String cosTitle, String userId) {
        courseRepository.deleteByCosTitleAndCosUserId(cosTitle, userId);
    }

    @Transactional(readOnly = true)
    public List<CourseEntity> getFavoriteCourses(String userId) {
        return courseRepository.findByCosUserId(userId);
    }
}

