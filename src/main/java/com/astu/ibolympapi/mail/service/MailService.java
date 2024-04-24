package com.astu.ibolympapi.mail.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;

@Service
public class MailService {
    @Value("${spring.mail.username}")
    private String senderEmail;
    public JavaMailSender emailSender;

    public void sendSimpleEmail(String toAddress, String subject, String message) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(toAddress);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);
            emailSender.send(simpleMailMessage);
        } catch (MailException e) {
            throw new BadRequestException(ErrorCode.ERROR_WHILE_SENDING_LETTER);
        }
    }

    public void sendEmailWithAttachment(String toAddress, String subject, String message, String attachment) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(toAddress);
            messageHelper.setSubject(subject);
            messageHelper.setText(message);
            FileSystemResource file = new FileSystemResource(ResourceUtils.getFile(attachment));
            messageHelper.addAttachment("Purchase Order", file);
            emailSender.send(mimeMessage);
        } catch (MessagingException | MailException e) {
            throw new BadRequestException(ErrorCode.ERROR_WHILE_SENDING_LETTER);
        } catch (FileNotFoundException e) {
            throw new BadRequestException(ErrorCode.FILE_NOT_FOUND);
        }
    }
}
