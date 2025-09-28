package com.news.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // ✅ Optional: log when app starts
    @EventListener(ApplicationReadyEvent.class)
    public void logStartup() {
        System.out.println("Backend API started successfully!");
        //System.out.println("📌 Swagger UI: http://localhost:8080/swagger-ui.html");
        //System.out.println("📌 API Docs:    http://localhost:8080/v3/api-docs");
    }
}
