package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanySignUpDto {
    private String providerId;
    private String providerName;
    private String providerEmail;
    private String providerPassword;
    private String providerProfile;
    private String companyName;
    private String companyAddress;
    private String companyTel;
}
