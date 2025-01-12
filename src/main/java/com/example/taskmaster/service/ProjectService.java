package com.example.taskmaster.service;

import com.example.taskmaster.entity.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    List<Project> getAllProjects();

    Optional<Project> getProjectById(Integer id);

    Project saveProject(Project project);

    void deleteProject(Integer id);

}
