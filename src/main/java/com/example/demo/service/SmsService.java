package com.example.demo.service;

import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import net.nurigo.sdk.NurigoApp;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import javax.annotation.PostConstruct;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SmsService {

    @Value("${coolsms.api.key}")
    private String apiKey;
    @Value("${coolsms.api.secret}")
    private String apiSecret;

    private DefaultMessageService messageService;
    private ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    public SingleMessageSentResponse sendVerificationCode(String toPhoneNumber) {
        String code = generateVerificationCode();
        verificationCodes.put(toPhoneNumber, code); // 인증번호 저장

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText("[HanSoYeon] 회원가입 인증번호는 " + code + "입니다.");

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%04d", random.nextInt(10000));
    }

    public boolean verifyCode(String phoneNumber, String inputCode) {
        String correctCode = verificationCodes.get(phoneNumber);
        return correctCode != null && correctCode.equals(inputCode);
    }
}


