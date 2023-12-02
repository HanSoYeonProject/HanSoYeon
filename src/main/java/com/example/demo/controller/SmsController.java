package com.example.demo.controller;

import com.example.demo.request.ApplicationNotificationRequest;
import com.example.demo.request.VerificationRequestBody;
import com.example.demo.service.SmsService;
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
    public ResponseEntity<?> sendVerificationCode(@RequestBody VerificationRequestBody request) {
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
    public ResponseEntity<?> verifyCode(@RequestBody VerificationRequestBody request) {
        boolean isValid = smsService.verifyCode(request.getPhone(), request.getCode());
        if (isValid) {
            return ResponseEntity.ok().body("인증번호가 확인되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/sendApplicationComplete")
    public ResponseEntity<?> sendApplicationComplete(@RequestBody ApplicationNotificationRequest request) {
        try {
            String phoneNumber = request.getPhone();
            String jobTitle = request.getJobTitle();
            smsService.sendApplicationCompleteMessage(phoneNumber, jobTitle);
            return ResponseEntity.ok().body("신청 완료 알림이 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("신청 완료 알림 전송에 실패했습니다.");
        }
    }

    @PostMapping("/sendApplicationCompanyComplete")
    public ResponseEntity<?> sendApplicationCompanyComplete(@RequestBody ApplicationNotificationRequest request) {
        try {
            String phoneNumber = request.getPhone();
            String jobTitle = request.getJobTitle();
            smsService.sendApplicationCompleteCompanyMessage(phoneNumber, jobTitle);
            return ResponseEntity.ok().body("신청 완료 알림이 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("신청 완료 알림 전송에 실패했습니다.");
        }
    }

    @PostMapping("/sendApplicationCancel")
    public ResponseEntity<?> sendApplicationCancel(@RequestBody ApplicationNotificationRequest request) {
        try {
            String phoneNumber = request.getPhone();
            String jobTitle = request.getJobTitle();
            smsService.sendApplicationCancelMessage(phoneNumber, jobTitle);
            return ResponseEntity.ok().body("신청 취소 알림이 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("신청 취소 알림 전송에 실패했습니다.");
        }
    }

    @PostMapping("/sendApplicationCompanyCancel")
    public ResponseEntity<?> sendApplicationCompanyCancel(@RequestBody ApplicationNotificationRequest request) {
        try {
            String phoneNumber = request.getPhone();
            String jobTitle = request.getJobTitle();
            smsService.sendApplicationCancelCompanyMessage(phoneNumber, jobTitle);
            return ResponseEntity.ok().body("신청 취소 알림이 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("신청 취소 알림 전송에 실패했습니다.");
        }
    }
}
