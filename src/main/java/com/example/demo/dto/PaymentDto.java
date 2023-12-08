package com.example.demo.dto;

import com.example.demo.entity.PaymentEntity;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentDto {
    private String merchant_uid;
    private String email;
    private int amount;
    private String company;
    private String apply_num;
    private Date paid_at;
    private int points;

    public String getMerchant_uid() {
        return merchant_uid;
    }

    public String getEmail() {
        return email;
    }

    public int getAmount() {
        return amount;
    }

    public String getCompany() {
        return company;
    }

    public String getApply_num() {
        return apply_num;
    }

    public Date getPaid_at() {
        return paid_at;
    }

    public int getPoints() {
        return points;
    }

    public void setMerchant_uid(String merchant_uid) {
        this.merchant_uid = merchant_uid;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setApply_num(String apply_num) {
        this.apply_num = apply_num;
    }

    public void setPaid_at(Date paid_at) {
        this.paid_at = paid_at;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
