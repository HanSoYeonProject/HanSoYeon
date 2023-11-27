package com.example.demo.entity;

import com.example.demo.dto.CompanySignUpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "providers")
public class ProvidersEntity {
    @Id
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

    public ProvidersEntity(CompanySignUpDto companySignUpDto) {
        this.providerId = companySignUpDto.getProviderId();
        this.providerName = companySignUpDto.getProviderName();
        this.providerEmail = companySignUpDto.getProviderEmail();
        this.providerPassword = companySignUpDto.getProviderPassword();
        this.providerProfile = companySignUpDto.getProviderProfile() != null && !companySignUpDto.getProviderProfile().isEmpty()
                ? companySignUpDto.getProviderProfile()
                : "hansoyeon/src/imgs/default_profile.png";
        this.companyName = companySignUpDto.getCompanyName();
        this.companyAddress = companySignUpDto.getCompanyAddress();
        this.companyTel = companySignUpDto.getCompanyTel();
        this.companyLicense = companySignUpDto.getCompanyLicense();
        this.providerApproval = companySignUpDto.getProviderApproval();
    }
}
