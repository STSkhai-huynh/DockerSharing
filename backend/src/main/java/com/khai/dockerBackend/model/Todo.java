package com.khai.dockerBackend.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="todos")
@NoArgsConstructor
@Data
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Size(max = 100, message = "Todo maximum limit is 100 Characters...")
    private String description;

    private Date targetDate;

    private boolean isDone;

    public Todo(String desc, Date targetDate, boolean isDone) {
        this.description = desc;
        this.targetDate = targetDate;
        this.isDone = isDone;
    }

}
