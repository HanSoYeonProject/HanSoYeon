package com.example.demo.dto;

import lombok.*;

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
    private String companyLicense;
    private String providerApproval;
}
