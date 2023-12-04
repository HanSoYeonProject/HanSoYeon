package com.example.demo.service;

import com.example.demo.dto.PaymentDto;
import com.example.demo.entity.PaymentEntity;
import com.example.demo.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public void savePayment(PaymentDto paymentDto) {
        PaymentEntity payment = new Payment();
        payment.setJob_id(paymentDto.getJob_id());
        payment.setUser_id(paymentDto.getUser_id());
        payment.setPayment_id(paymentDto.getPayment_id());
        payment.setPayment_money(paymentDto.getPayment_money());
        payment.setPayment_date(new Date());
        payment.setPaymentMethod(paymentDto.getPayment_method());

        paymentRepository.save(payment);
    }
}
