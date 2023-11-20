package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.ProvidersEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.ProvidersRepository;
import com.example.demo.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProvidersService {

    @Autowired
    ProvidersRepository providersRepository;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerCompany(CompanySignUpDto companySignUpDto) {
        ProvidersEntity providersEntity = new ProvidersEntity(companySignUpDto);
        providersEntity.setProviderPassword(passwordEncoder.encode(companySignUpDto.getProviderPassword()));
        providersRepository.save(providersEntity);
    }

    public ResponseDto<CompanySignInResponseDto> signIn(CompanySignInDto dto){
        String providerId = dto.getProviderId();
        String providerPassword = dto.getProviderPassword();

        ProvidersEntity providersEntity = null;
        try {
            providersEntity = providersRepository.findByProviderId(providerId);
            if(providersEntity == null){
                return ResponseDto.setFailed("로그인 실패");
            }
            if(!passwordEncoder.matches(providerPassword, providersEntity.getProviderPassword())){
                return ResponseDto.setFailed("로그인 실패");
            }
        }catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 오류");
        }
        providersEntity.setProviderPassword("");

        String token = tokenProvider.create(providerId);
        int exprTime = 3600000;
        String userType = "company";

        CompanySignInResponseDto companySignInResponseDto = new CompanySignInResponseDto(token, exprTime, providersEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", companySignInResponseDto);
    }
}
