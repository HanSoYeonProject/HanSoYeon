package com.example.demo.controller;

import com.example.demo.dto.PaymentDto;
import com.example.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PayController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/saveClass")
    public void savePayment(@RequestBody PaymentDto paymentDto) {
        System.out.println("Received payment data:");
        System.out.println("Email: " + paymentDto.getEmail());
        System.out.println("Company: " + paymentDto.getCompany());
        System.out.println("Amount: " + paymentDto.getAmount());
        System.out.println("Merchant UID: " + paymentDto.getMerchant_uid());
        System.out.println("Apply Num: " + paymentDto.getApply_num());
        System.out.println("Paid At: " + paymentDto.getPaid_at());
        System.out.println("Point: " + paymentDto.getPoints());
        paymentService.savePayment(paymentDto);
    }

    @GetMapping("/responseClass")
    public List<PaymentDto> getPayment() {
        return paymentService.getAllPaymentDtos();
    }
    // 특정 기업의 결제 내역 조회
    @GetMapping("/company/{email}")
    public List<PaymentDto> getPaymentsByCompany(@PathVariable String email) {
        return paymentService.getPaymentsByCompany(email);
    }
}
