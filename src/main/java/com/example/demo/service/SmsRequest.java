package com.example.demo.service;

import lombok.Getter;

@Getter
public class SmsRequest {
    private String from;
    private String to;
    private String type;
    private String text;

    public SmsRequest(String from, String to, String text) {
        this.from = from;
        this.to = to;
        this.type = "SMS";
        this.text = text;
    }
}

