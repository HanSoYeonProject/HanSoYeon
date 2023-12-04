package com.example.demo.repository;

import com.example.demo.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    PaymentEntity findById(int paymentId);
}
