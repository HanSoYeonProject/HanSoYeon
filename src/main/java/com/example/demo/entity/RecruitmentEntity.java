package com.example.demo.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "recruitments")
public class RecruitmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private int jobId;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_content", nullable = false)
    private String jobContent;

    @Column(name = "job_second", nullable = false)
    private String jobSecond;

    public String getJobSecond() {
        return jobSecond;
    }

    public void setJobSecond(String jobSecond) {
        this.jobSecond = jobSecond;
    }

    public String getJobThird() {
        return jobThird;
    }

    public void setJobThird(String jobThird) {
        this.jobThird = jobThird;
    }

    @Column(name = "job_third", nullable = false)
    private String jobThird;

    @Column(name = "job_schedule", nullable = false)
    private String jobSchedule;

    @Column(name = "job_region", nullable = false)
    private String jobRegion;

    @Column(name = "job_address", nullable = false)
    private String jobAddress;
    @Column(name = "job_providers", length = 100)
    private String jobProviders;

    @Column(name = "job_morning", nullable = false)
    private String jobMorning;

    @Column(name = "job_lunch", nullable = false)
    private String jobLunch;

    @Column(name = "job_dinner", nullable = false)
    private String jobDinner;

    @Column(name = "job_background", nullable = false)
    private String jobBackground;

    @Column(name = "job_need", nullable = false)
    private String jobNeed;

    @Column(name = "job_start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date jobStartDate;

    @Column(name = "job_end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date jobEndDate;

    @ElementCollection
    @Column(name = "job_images", columnDefinition = "TEXT")
    private List<String> jobImages = new ArrayList<>();  // 이미지를 Base64 인코딩 문자열로 저장

    @Column(name = "job_money", nullable = false)
    private String jobMoney;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recruitment_id")
    private List<ImageEntity> images = new ArrayList<>();

    public String getJobMorning() {
        return jobMorning;
    }

    public void setJobMorning(String jobMorning) {
        this.jobMorning = jobMorning;
    }

    public String getJobLunch() {
        return jobLunch;
    }

    public void setJobLunch(String jobLunch) {
        this.jobLunch = jobLunch;
    }

    public String getJobDinner() {
        return jobDinner;
    }

    public void setJobDinner(String jobDinner) {
        this.jobDinner = jobDinner;
    }

    public String getJobBackground() {
        return jobBackground;
    }

    public void setJobBackground(String jobBackground) {
        this.jobBackground = jobBackground;
    }

    public String getJobNeed() {
        return jobNeed;
    }

    public void setJobNeed(String jobNeed) {
        this.jobNeed = jobNeed;
    }

    public List<ImageEntity> getImages() {
        return images;
    }

    public void setImages(List<ImageEntity> images) {
        this.images = images;
    }
    public int getJobId() {
        return jobId;
    }

    public void setJobId(int Id) {
        this.jobId = Id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobRegion() {
        return jobRegion;
    }

    public void setJobRegion(String jobRegion) {
        this.jobRegion = jobRegion;
    }

    public String getJobAddress() {
        return jobAddress;
    }

    public void setJobAddress(String jobAddress) {
        this.jobAddress = jobAddress;
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

    public List<String> getJobImages() {
        return jobImages;
    }

    public void setJobImages(List<String> jobImages) {
        this.jobImages = jobImages;
    }

    public String getJobMoney() {
        return jobMoney;
    }

    public void setJobMoney(String jobMoney) {
        this.jobMoney = jobMoney;
    }

    public String getJobContent() {
        return jobContent;
    }

    public void setJobContent(String jobContent) {
        this.jobContent = jobContent;
    }

    public String getJobSchedule() {
        return jobSchedule;
    }

    public void setJobSchedule(String jobSchedule) {
        this.jobSchedule = jobSchedule;
    }
}