package com.example.demo.response;

import com.example.demo.service.ServiceResult;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * ResponseBuilder
 * @apiNote A builder that creates a ResponseEntity based on the ResponseBody type.
 * @author WoodyK
 * @see ResponseBody
 * @see ResponseEntity
 */
@NoArgsConstructor
@AllArgsConstructor
public class ResponseBuilder {

    ResponseBody responseBody = new ResponseBody();

    public ResponseBuilder ok() {
        this.responseBody.setCode(HttpStatus.OK.value());
        this.responseBody.setMessage("OK");
        return this;
    }

    public ResponseBuilder badRequest(){
        this.responseBody.setCode(HttpStatus.BAD_REQUEST.value());
        this.responseBody.setMessage("BAD REQUEST");
        return this;
    }

    public ResponseBuilder message(String message){
        this.responseBody.setMessage(message);
        return this;
    }

    public ResponseBuilder data(Object data){
        this.responseBody.setData(data);
        return this;
    }

    public ResponseBuilder serviceResult(ServiceResult sr){
        this.responseBody.setCode(sr.isSuccess() ? HttpStatus.OK.value() : HttpStatus.BAD_REQUEST.value());
        this.responseBody.setMessage(sr.getMessage());
        this.responseBody.setData(sr.getData());
        return this;
    }

    public ResponseEntity<?> build(){
        return ResponseEntity.status(HttpStatus.
                valueOf(responseBody.getCode()))
                .body(this.responseBody);
    }
}
