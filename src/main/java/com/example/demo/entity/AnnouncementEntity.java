package com.example.demo.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Announcement")
public class AnnouncementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "anno_id")
    private int annoId;

    @Column(name = "anno_title", length = 200)
    private String annoTitle;

    @Column(name = "anno_content", columnDefinition = "TEXT")
    private String annoContent;

    @Column(name = "anno_regist")
    private LocalDateTime annoRegist;

    @Column(name = "anno_views")
    private int annoViews;

    public int getAnnoId() {
        return annoId;
    }

    public void setAnnoId(int annoId) {
        this.annoId = annoId;
    }

    public String getAnnoTitle() {
        return annoTitle;
    }

    public void setAnnoTitle(String annoTitle) {
        this.annoTitle = annoTitle;
    }

    public String getAnnoContent() {
        return annoContent;
    }

    public void setAnnoContent(String annoContent) {
        this.annoContent = annoContent;
    }

    public LocalDateTime getAnnoRegist() {
        return annoRegist;
    }

    public void setAnnoRegist(LocalDateTime annoRegist) {
        this.annoRegist = annoRegist;
    }

    public int getAnnoViews() {
        return annoViews;
    }

    public void setAnnoViews(int annoViews) {
        this.annoViews = annoViews;
    }

}
