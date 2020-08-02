package com.projecttool.demo.services;

import com.projecttool.demo.domain.Backlog;
import com.projecttool.demo.domain.Project;
import com.projecttool.demo.domain.User;
import com.projecttool.demo.exeptions.ProjectIdException;
import com.projecttool.demo.exeptions.ProjectNotFoundException;
import com.projecttool.demo.repositories.BacklogRepository;
import com.projecttool.demo.repositories.ProjectRepository;
import com.projecttool.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {

        if (project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if (existingProject != null && !existingProject.getProjectLeader().equals(username)) {
                throw new ProjectNotFoundException("Project not found in your account");
            } else if (existingProject == null) {
                throw new ProjectNotFoundException("Project with Id: '" + project.getProjectIdentifier() + "' cannot be " +
                        "update because it doesn't exist.");
            }
        }

        try {
            User user = userRepository.findByUsername(username);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
                project.setBacklog(backlog);
            } else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project Id " + project.getProjectIdentifier().toUpperCase() + " already exists");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project Id " + projectIdentifier.toUpperCase() + " doesn't exists");
        }

        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return projectRepository.findByProjectIdentifier(projectIdentifier);
    }

    public  Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectIdentifier, String username) {
        projectRepository.delete(findProjectByIdentifier(projectIdentifier, username));
    }
}
