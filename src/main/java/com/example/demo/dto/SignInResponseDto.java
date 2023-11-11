package com.example.demo.dto;

import com.example.demo.entity.UsersEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDto {
    private String token;
    private int exprTime;
    private UsersEntity user;
}
