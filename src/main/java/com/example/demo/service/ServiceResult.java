package com.example.demo.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import okhttp3.internal.http2.Http2Reader;
import org.apache.struts.config.ConfigHelper;
import org.springframework.stereotype.Service;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResult {

    public boolean result;
    public String message;
    public Object data;

    static final boolean SUCCESS = true;
    static final boolean FAIL = false;

    public ServiceResult success() {
        this.result = SUCCESS;
        return this;
    }

    public ServiceResult fail() {
        this.result = SUCCESS;
        return this;
    }

    public ServiceResult message(String message){
        this.message = message;
        return this;
    }

    public ServiceResult data(Object data){
        this.data = data;
        return this;
    }


    public boolean isSuccess(){
        return this.result;
    }

    public boolean isFail(){
        return !this.result;
    }
}
