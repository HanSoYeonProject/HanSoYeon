package com.example.demo.dto;

import java.util.Date;

public class JobProviderDto {

    private Long id;
    private String title;
    private String description;
    private String workSchedule;
    private String region;
    private String providers;
    private Date startDate;
    private Date endDate;
    private String money;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWorkSchedule() {
        return workSchedule;
    }

    public void setWorkSchedule(String workSchedule) {
        this.workSchedule = workSchedule;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getProviders() {
        return providers;
    }

    public void setProviders(String providers) {
        this.providers = providers;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    // 이미지 필드는 DTO에서 제외할 수 있습니다. 필요한 경우 URL 또는 다른 형식으로 포함시킬 수 있습니다.

    // 필요한 경우, 이미지를 포함시킬 수 있는 필드를 추가할 수 있습니다.
    // private String imageUrl; // 예를 들어, 이미지 URL을 저장하는 필드

    // Getter와 Setter 메서드
    // 여기에 필요한 getter와 setter 메서드를 추가합니다.

    // 기본 생성자 및 매개변수를 가진 생성자
    // 기본 생성자와 필요에 따라 매개변수를 가진 생성자를 추가할 수 있습니다.

    // toString(), hashCode(), equals() 메서드
    // 필요에 따라 toString(), hashCode(), equals() 메서드를 오버라이드할 수 있습니다.

    // 기타 필요한 메서드
    // DTO의 로직에 따라 기타 필요한 메서드를 추가할 수 있습니다.
}