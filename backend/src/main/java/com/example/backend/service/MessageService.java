package com.example.backend.service;

import com.example.backend.model.Message;
import com.example.backend.response.MessageResponse;
import com.example.backend.store.MessageRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    private static String secret;
    private static int expiration_time;

    @Value("${jwt.secret}")
    public void setJWTSecret(String secret) {
        this.secret = secret;
    }

    @Value("${jwt.expirationTime}")
    public void setJWTExpiration(int expiration_time) {
        this.expiration_time = expiration_time;
    }

    public MessageService() {
    }

    private List<MessageResponse> returnNewList(List<Message> list) {
        return list.stream().map(p -> new MessageResponse(
                p.getSenderName(),
                p.getMessage())).collect(Collectors.toList());
    }

    public String saveMessage(Message message) {
        messageRepository.save(message);
        return "Okay";
    }

    public List<MessageResponse> getMessages() {
        List<Message> list = messageRepository.findAll();
        return returnNewList(list);
    }

    public String getToken(String name) {
        String JWT = Jwts.builder()
                .setSubject(name)
                .setExpiration(new Date(System.currentTimeMillis() + expiration_time))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        return JWT;
    }
}
