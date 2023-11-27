package com.example.demo.entity;

import com.example.demo.dto.CompanySignUpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
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
    @Column(name = "provider_id")
    public String providerId;
    @Column(name = "provider_name")
    public String providerName;
    @Column(name = "provider_email")
    public String providerEmail;
    @Column(name = "provider_password")
    public String providerPassword;
    @Column(name = "provider_profile")
    public String providerProfile;
    @Column(name = "company_name")
    public String companyName;
    @Column(name = "company_address")
    public String companyAddress;
    @Column(name = "company_tel")
    public String companyTel;
    @Column(name = "company_license")
    public String companyLicense;
    @Column(name = "provider_approval")
    public String providerApproval;

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
