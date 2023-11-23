package com.example.demo.controller;

import com.example.demo.service.SmsService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/sendVerification")
    public ResponseEntity<?> sendVerificationCode(@RequestBody VerificationRequest request) {
        try {
            String phoneNumber = request.getPhone();
            smsService.sendVerificationCode(phoneNumber);
            return ResponseEntity.ok().body("인증번호가 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("인증번호 전송에 실패했습니다.");
        }
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestBody VerificationRequest request) {
        boolean isValid = smsService.verifyCode(request.getPhone(), request.getCode());
        if (isValid) {
            return ResponseEntity.ok().body("인증번호가 확인되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증번호가 일치하지 않습니다.");
        }
    }
}

// VerificationRequest 클래스
@Getter
class VerificationRequest {
    private String phone;
    private String code;

    public VerificationRequest(String phone, String code) {
        this.phone = phone;
        this.code = code;
    }
}
