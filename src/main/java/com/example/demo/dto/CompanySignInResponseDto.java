package com.example.demo.dto;

import com.example.demo.entity.ProviderEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanySignInResponseDto {
    private String token;
    private int exprTime;
    private ProviderEntity user;
    private String userType;
}
