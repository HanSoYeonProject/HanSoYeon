package com.example.demo.controller;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.CourseEntity;
import com.example.demo.service.CourseService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cos")
public class CourseController {

    @Autowired
    private CourseService courseService;

    Logger logger = Logger.getLogger("mylogger");

    @PostMapping("/add")
    public ResponseEntity<CourseEntity> addCourse(@RequestBody CourseDto courseDto) {
        CourseEntity savedCourse = courseService.addCourse(courseDto);
        return ResponseEntity.ok(savedCourse);
    }

    @GetMapping("/check/{cosTitle}/{userId}")
    public ResponseEntity<?> checkFavorite(@PathVariable String cosTitle, @PathVariable String userId) {
        try {
            boolean isFavorited = courseService.checkFavorite(cosTitle, userId);
            return ResponseEntity.ok(Map.of("isFavorited", isFavorited));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{cosTitle}/{userId}")
    public ResponseEntity<?> deleteCourse(@PathVariable String cosTitle, @PathVariable String userId) {
        try {
            courseService.deleteCourse(cosTitle, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "에러", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/favorites/{userId}")
    public ResponseEntity<List<CourseEntity>> getFavoriteCourses(@PathVariable String userId) {
        try {
            List<CourseEntity> favorites = courseService.getFavoriteCourses(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "에러", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


