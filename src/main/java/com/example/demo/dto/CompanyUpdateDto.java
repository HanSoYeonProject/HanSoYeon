package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyUpdateDto {
    private String companyName;
    private String companyAddress;
    private String companyTel;
    private String providerProfile;
}
