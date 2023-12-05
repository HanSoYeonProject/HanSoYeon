package com.example.demo.service;

import com.example.demo.dto.PaymentDto;
import com.example.demo.entity.PaymentEntity;
import com.example.demo.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    private PaymentDto convertToDto(PaymentEntity payment) {
        if (payment == null) {
            throw new IllegalArgumentException("Input PaymentEntity cannot be null");
        }
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setAmount(payment.getAmount());
        paymentDto.setEmail(payment.getEmail());
        paymentDto.setCompany(payment.getCompany());
        paymentDto.setPoints(payment.getPoints());
        paymentDto.setPaid_at(payment.getPaidAt());
        paymentDto.setApply_num(payment.getApplyNum());
        paymentDto.setMerchant_uid(payment.getMerchantUid());
        return paymentDto;
    }
    //결제 저장
    public void savePayment(PaymentDto paymentDto) {
        PaymentEntity payment = new PaymentEntity(paymentDto);
        paymentRepository.save(payment);
    }

    //결제 가져오기
    public List<PaymentDto> getAllPaymentDtos() {
        List<PaymentEntity> paymentEntities = paymentRepository.findAll();
        System.out.println("Total payments retrieved: " + paymentEntities.size()); // 로그 추가
        return paymentEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 특정 기업의 결제 내역 조회
    public List<PaymentDto> getPaymentsByCompany(String email) {
        List<PaymentEntity> payments = paymentRepository.findByEmail(email);
        return payments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

}
