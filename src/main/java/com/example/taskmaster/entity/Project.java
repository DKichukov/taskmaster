package com.example.taskmaster.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "project", cascade = ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Task> tasks;


    public void addTask(Task task) {
        tasks.add(task);
        task.setProject(this);
    }
    public void removeTask(Task task) {
        tasks.remove(task);
        task.setProject(null);
    }
}
