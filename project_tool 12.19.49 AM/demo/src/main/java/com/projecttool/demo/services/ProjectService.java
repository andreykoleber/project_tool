package com.projecttool.demo.services;

import com.projecttool.demo.domain.Project;
import com.projecttool.demo.exeptions.ProjectIdException;
import com.projecttool.demo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project Id " + project.getProjectIdentifier().toUpperCase() + " already exists");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project Id " + projectIdentifier.toUpperCase() + " doesn't exists");
        }
        return projectRepository.findByProjectIdentifier(projectIdentifier);
    }

    public  Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Cannot delete project with projectIdentifier " + projectIdentifier.toUpperCase() + ". This project doesn't exists");
        }
        projectRepository.delete(project);
    }
}
