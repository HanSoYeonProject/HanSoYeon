package com.example.demo.request;

import lombok.*;

// VerificationRequest 클래스
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerificationRequestBody {
    private String phone;
    private String code;
}