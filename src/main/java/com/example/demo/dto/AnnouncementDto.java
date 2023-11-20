package com.example.demo.dto;

import java.time.LocalDateTime;

public class AnnouncementDto {
    private int anno_id;
    private String anno_title;
    private String anno_content;
    private LocalDateTime anno_regist;
    private int anno_views;

    public AnnouncementDto() {

    }

    public AnnouncementDto(int anno_id, String anno_title, String anno_content, LocalDateTime anno_regist, int anno_views) {
        this.anno_id = anno_id;
        this.anno_title = anno_title;
        this.anno_content = anno_content;
        this.anno_regist = anno_regist;
        this.anno_views = anno_views;
    }

    public int getAnno_id() {
        return anno_id;
    }

    public void setAnno_id(int anno_id) {
        this.anno_id = anno_id;
    }

    public String getAnno_title() {
        return anno_title;
    }

    public void setAnno_title(String anno_title) {
        this.anno_title = anno_title;
    }

    public String getAnno_content() {
        return anno_content;
    }

    public void setAnno_content(String anno_content) {
        this.anno_content = anno_content;
    }

    public LocalDateTime getAnno_regist() {
        return anno_regist;
    }

    public void setAnno_regist(LocalDateTime anno_regist) {
        this.anno_regist = anno_regist;
    }

    public int getAnno_views() {
        return anno_views;
    }

    public void setAnno_views(int anno_views) {
        this.anno_views = anno_views;
    }
}
