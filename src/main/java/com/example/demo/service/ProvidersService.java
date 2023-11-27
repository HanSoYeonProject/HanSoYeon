package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.ProviderEntity;
import com.example.demo.repository.ProvidersRepository;
import com.example.demo.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvidersService {

    @Autowired
    ProvidersRepository providersRepository;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerCompany(CompanySignUpDto companySignUpDto) {
        ProviderEntity providerEntity = new ProviderEntity(companySignUpDto);
        providerEntity.setProviderPassword(passwordEncoder.encode(companySignUpDto.getProviderPassword()));
        providersRepository.save(providerEntity);
    }

    public ResponseDto<CompanySignInResponseDto> signIn(CompanySignInDto dto){
        String providerId = dto.getProviderId();
        String providerPassword = dto.getProviderPassword();

        ProviderEntity providerEntity = null;
        try {
            providerEntity = providersRepository.findByProviderId(providerId);
            if(providerEntity == null){
                return ResponseDto.setFailed("로그인 실패");
            }
            if(!passwordEncoder.matches(providerPassword, providerEntity.getProviderPassword())){
                return ResponseDto.setFailed("로그인 실패");
            }
        }catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 오류");
        }
        providerEntity.setProviderPassword("");

        String token = tokenProvider.create(providerId);
        int exprTime = 3600000;
        String userType = "company";

        CompanySignInResponseDto companySignInResponseDto = new CompanySignInResponseDto(token, exprTime, providerEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", companySignInResponseDto);
    }

    public ProviderEntity getUserById(String providerId) {
        return providersRepository.findByProviderId(providerId);
    }

    public boolean verifyProviderPassword(String providerId, String providerPassword) {
        ProviderEntity providerEntity = providersRepository.findByProviderId(providerId);
        if (providerEntity != null) {
            return passwordEncoder.matches(providerPassword, providerEntity.getProviderPassword());
        }
        return false;
    }

    public ResponseEntity<?> updateCompanyInfo(String providerId, CompanyUpdateDto companyUpdateDto) {
        ProviderEntity providerEntity = providersRepository.findByProviderId(providerId);

        if (providerEntity != null) {
            // DTO의 값들을 entity에 할당
            providerEntity.setCompanyName(companyUpdateDto.getCompanyName());
            providerEntity.setCompanyAddress(companyUpdateDto.getCompanyAddress());
            providerEntity.setCompanyTel(companyUpdateDto.getCompanyTel());
            providerEntity.setProviderProfile(companyUpdateDto.getProviderProfile());

            providersRepository.save(providerEntity); // 업데이트된 정보 저장
            return ResponseEntity.ok().body("회사 정보가 성공적으로 업데이트되었습니다.");
        }

        return ResponseEntity.badRequest().body("회사 정보를 찾을 수 없습니다.");
    }

    public List<ProviderEntity> getAllCompanies() {
        return providersRepository.findAll();
    }

    public ResponseEntity<?> deleteProvider(String providerId) {
        ProviderEntity provider = providersRepository.findByProviderId(providerId);
        if (provider != null) {
            providersRepository.delete(provider);
            return ResponseEntity.ok().body("Provider deleted successfully");
        }
        return ResponseEntity.badRequest().body("Provider not found");
    }

    public ResponseEntity<?> approveProvider(String providerId) {
        ProviderEntity provider = providersRepository.findByProviderId(providerId);
        if (provider != null) {
            provider.setProviderApproval("true");
            providersRepository.save(provider);
            return ResponseEntity.ok().body("Provider approved successfully");
        }
        return ResponseEntity.badRequest().body("Provider not found");
    }

    public ResponseEntity<?> revokeProviderApproval(String providerId) {
        ProviderEntity provider = providersRepository.findByProviderId(providerId);
        if (provider != null) {
            provider.setProviderApproval("false");
            providersRepository.save(provider);
            return ResponseEntity.ok().body("Provider approval revoked successfully");
        }
        return ResponseEntity.badRequest().body("Provider not found");
    }


}
