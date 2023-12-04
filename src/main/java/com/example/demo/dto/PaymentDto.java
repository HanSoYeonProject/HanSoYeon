package com.example.demo.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
@ToString
public class PaymentDto {

    private int payment_id;
    private int job_id;
    private String user_id;
    private String payment_money;
    private Date payment_date;
    private String payment_method;
    public int getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(int payment_id) {
        this.payment_id = payment_id;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getPayment_money() {
        return payment_money;
    }

    public void setPayment_money(String payment_money) {
        this.payment_money = payment_money;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(Date payment_date) {
        this.payment_date = payment_date;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

}
