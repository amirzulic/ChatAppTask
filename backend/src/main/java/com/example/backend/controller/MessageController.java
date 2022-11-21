package com.example.backend.controller;

import com.example.backend.model.Message;
import com.example.backend.response.MessageResponse;
import com.example.backend.service.MessageService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/message")
    public ResponseEntity<String> saveBid(@RequestBody Message message) {
        return ResponseEntity.ok(messageService.saveMessage(message));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<MessageResponse>> getMessages() {
        return ResponseEntity.ok(new ArrayList<MessageResponse>(messageService.getMessages()));
    }
}
