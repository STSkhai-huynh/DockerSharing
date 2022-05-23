package com.khai.dockerBackend.Exception;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(Long id) {
        super("Could not find Todo: " + id);
    }
}
