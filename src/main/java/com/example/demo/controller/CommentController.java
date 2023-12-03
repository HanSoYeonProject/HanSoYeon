package com.example.demo.controller;

import com.example.demo.dto.CommentDto;
import com.example.demo.entity.CommentEntity;
import com.example.demo.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/comments/{reviewId}")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable int reviewId) {
        List<CommentEntity> comments = commentService.findCommentsByReviewId(reviewId);
        List<CommentDto> commentDtos = comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentDtos);
    }

    @PostMapping("/comments/{reviewId}")
    public ResponseEntity<CommentDto> addComment(@PathVariable int reviewId, @RequestBody CommentDto commentDto) {
        CommentEntity comment = modelMapper.map(commentDto, CommentEntity.class);
        comment.setReviewId(reviewId);
        CommentEntity savedComment = commentService.save(comment);
        CommentDto savedCommentDto = modelMapper.map(savedComment, CommentDto.class);
        return ResponseEntity.ok(savedCommentDto);
    }
}
