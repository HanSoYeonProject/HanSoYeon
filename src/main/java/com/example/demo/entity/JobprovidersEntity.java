package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Jobproviders")
public class JobprovidersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Long id;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_content", nullable = false, columnDefinition = "TEXT")
    private String jobContent;

    @Column(name = "job_work_schedule", length = 2000)
    private String jobWorkSchedule;

    @Column(name = "job_region", nullable = false)
    private String jobRegion;

    @Column(name = "job_providers", length = 100)
    private String jobProviders;

    @Column(name = "job_start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date jobStartDate;

    @Column(name = "job_end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date jobEndDate;

    @Column(name = "job_image", columnDefinition = "TEXT")
    private String jobImage;  // 이미지를 Base64 인코딩 문자열로 저장

    @Column(name = "job_money", nullable = false)
    private String jobMoney;

    // Getter와 Setter 메서드는 생략 (필요한 경우 추가)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobContent() {
        return jobContent;
    }

    public void setJobContent(String jobContent) {
        this.jobContent = jobContent;
    }

    public String getJobWorkSchedule() {
        return jobWorkSchedule;
    }

    public void setJobWorkSchedule(String jobWorkSchedule) {
        this.jobWorkSchedule = jobWorkSchedule;
    }

    public String getJobRegion() {
        return jobRegion;
    }

    public void setJobRegion(String jobRegion) {
        this.jobRegion = jobRegion;
    }

    public String getJobProviders() {
        return jobProviders;
    }

    public void setJobProviders(String jobProviders) {
        this.jobProviders = jobProviders;
    }

    public Date getJobStartDate() {
        return jobStartDate;
    }

    public void setJobStartDate(Date jobStartDate) {
        this.jobStartDate = jobStartDate;
    }

    public Date getJobEndDate() {
        return jobEndDate;
    }

    public void setJobEndDate(Date jobEndDate) {
        this.jobEndDate = jobEndDate;
    }

    public String getJobImage() {
        return jobImage;
    }

    public void setJobImage(String jobImage) {
        this.jobImage = jobImage;
    }

    public String getJobMoney() {
        return jobMoney;
    }

    public void setJobMoney(String jobMoney) {
        this.jobMoney = jobMoney;
    }
}
