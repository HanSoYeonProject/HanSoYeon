package com.example.demo.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// VerificationRequest 클래스
@Getter
@Setter
@NoArgsConstructor
public class VerificationRequest {
    private String phone;
    private String code;
}
