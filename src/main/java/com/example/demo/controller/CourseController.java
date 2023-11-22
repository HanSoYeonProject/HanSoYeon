package com.example.demo.controller;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.CourseEntity;
import com.example.demo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cos")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public ResponseEntity<CourseEntity> addCourse(@RequestBody CourseDto courseDto) {
        CourseEntity savedCourse = courseService.addCourse(courseDto);
        return ResponseEntity.ok(savedCourse);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteFavoriteSpot(@RequestBody Map<String, String> requestData) {
        try {
            String encodedTitle = requestData.get("title");
            String decodedTitle = URLDecoder.decode(encodedTitle, StandardCharsets.UTF_8.toString());
            courseService.deleteCourseByTitle(decodedTitle);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
}

