package com.khai.dockerBackend.controller;

import com.khai.dockerBackend.model.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;


@RestController
@RequiredArgsConstructor
public class WelcomeController {
    @GetMapping("/")
    public Todo sample(ModelMap model) {
        return new Todo("description", new Date(), false);
    }
}