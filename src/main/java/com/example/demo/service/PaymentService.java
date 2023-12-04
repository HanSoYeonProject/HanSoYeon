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
        PaymentEntity payment = new PaymentEntity();
        payment.setJobId(paymentDto.getJob_id());
        payment.setUserId(paymentDto.getUser_id());
        payment.setPaymentId(paymentDto.getPayment_id());
        payment.setPaymentMoney(paymentDto.getPayment_money());
        payment.setPaymentDate(new Date());
        payment.setPaymentMethod(paymentDto.getPayment_method());

        paymentRepository.save(payment);
    }
}
