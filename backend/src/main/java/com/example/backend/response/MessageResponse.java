package com.example.backend.response;

public class MessageResponse {
    private String senderName;
    private String message;

    public MessageResponse(String senderName, String message) {
        this.senderName = senderName;
        this.message = message;
    }

    public MessageResponse() {
    }

    public String getSenderName() {
        return senderName;
    }

    public String getMessage() {
        return message;
    }
}
