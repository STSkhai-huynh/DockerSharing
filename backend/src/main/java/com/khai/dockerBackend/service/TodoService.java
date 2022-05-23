package com.khai.dockerBackend.service;

import com.khai.dockerBackend.Exception.TodoNotFoundException;
import com.khai.dockerBackend.model.Todo;
import com.khai.dockerBackend.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> getAllTodo() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(long id) {
        return todoRepository.findById(id);
    }

    public Todo updateTodo(long id, Todo newTodo) {
        Optional<Todo> currentTodo = todoRepository.findById(id);

        if (currentTodo.isPresent()) {
            Todo updatedTodo = currentTodo.get();
            updatedTodo.setDescription(newTodo.getDescription());
            updatedTodo.setTargetDate(newTodo.getTargetDate());
            updatedTodo.setDone(newTodo.isDone());
            return todoRepository.save(updatedTodo);
        } else {
            throw new TodoNotFoundException(id);
        }
    }


    public Todo createTodo(String desc, Date targetDate, boolean isDone) {
        return todoRepository.save(new Todo(desc, targetDate, isDone));
    }

    public void deleteTodo(long id) {
        Optional <Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            todoRepository.delete(todo.get());
        }
    }
}
