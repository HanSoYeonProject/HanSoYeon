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

    public SingleMessageSentResponse sendApplicationCompleteMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] 귀하가 신청한 [" + jobTitle + "] 공고가 성공적으로 처리되었습니다. 감사합니다!";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationCompleteCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명이 신청하였습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }
    public SingleMessageSentResponse sendApplicationCancelMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] 귀하가 신청한 [" + jobTitle + "] 공고가 성공적으로 취소되었습니다. 감사합니다!";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationCancelCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명이 신청을 취소하였습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingCompleteMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] 귀하가 신청한 [" + jobTitle + "] 공고에 선정되었습니다. 축하드립니다! 자세한 내용은 신청한 공고 페이지 참고 부탁드립니다. ";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingCompleteCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명이 승인되었습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingCancelMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] 귀하가 신청한 [" + jobTitle + "] 공고의 선정이 취소되었습니다. 아쉽지만 다음 기회를 노려보세요!. ";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingCancelCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명의 승인을 취소하였습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingDeleteMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고가 정상적으로 삭제되었습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingWriteBoardCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명의 리뷰 권한을 승인하였습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingWriteBoardMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] 일 하느라 수고하셨습니다 [" + jobTitle + "] 공고에 리뷰를 작성해주세요 !";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingWriteBoardCancelCompanyMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고에 1명의 리뷰 권한을 취소하였습니다.";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public SingleMessageSentResponse sendApplicationMatchingWriteBoardCancelMessage(String toPhoneNumber, String jobTitle) {
        String messageContent = "[HanSoYeon] [" + jobTitle + "] 공고 리뷰 권한이 취소되었습니다";

        Message message = new Message();
        message.setFrom("01091753460");
        message.setTo(toPhoneNumber);
        message.setText(messageContent);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }
}


