package com.example.demo.dto;

import com.example.demo.entity.PaymentEntity;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentDto {
    private String merchant_uid;
    private String email;
    private int amount;
    private String company;
    private String apply_num;
    private Date paid_at;
    private int points;


}
