package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

import com.example.demo.dto.PaymentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Data
@Table(name = "payments")
public class PaymentEntity {
    @Id
    @Column(name = "email")
    public String email;
    @Column(name = "merchant_uid")
    public String merchantUid;
    @Column(name="amount")
    public int amount;
    @Column(name="company")
    public String company;
    @Column(name="apply_num")
    public String applyNum;
    @Column(name="paid_at")
    public Date paidAt;
    @Column(name="points")
    public int points;

    public PaymentEntity(PaymentDto paymentDto) {
        this.merchantUid = paymentDto.getMerchant_uid();
        this.email = paymentDto.getEmail();
        this.amount = paymentDto.getAmount();
        this.company = paymentDto.getCompany();
        this.applyNum = paymentDto.getApply_num();
        this.paidAt = paymentDto.getPaid_at();
        this.points = paymentDto.getPoints();
    }
}
