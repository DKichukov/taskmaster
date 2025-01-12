package com.example.taskmaster.service;

import com.example.taskmaster.entity.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> getAllTasks();

    Optional<Task> getTaskById(Integer id);

    Task saveTask(Task task);

    void deleteTask(Integer id);

}
