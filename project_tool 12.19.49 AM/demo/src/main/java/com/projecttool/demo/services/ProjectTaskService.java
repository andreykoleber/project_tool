package com.projecttool.demo.services;

import com.projecttool.demo.domain.Backlog;
import com.projecttool.demo.domain.Project;
import com.projecttool.demo.domain.ProjectTask;
import com.projecttool.demo.exeptions.ProjectNotFoundException;
import com.projecttool.demo.repositories.BacklogRepository;
import com.projecttool.demo.repositories.ProjectRepository;
import com.projecttool.demo.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectTask.setBacklog(backlog);
        Integer backlogSequence = backlog.getPTSequence();
        backlog.setPTSequence(++backlogSequence);
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        if (StringUtils.isEmpty(projectTask.getStatus())) {
            projectTask.setStatus("TO_DO");
        }
        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String backlogId, String username) {
        projectService.findProjectByIdentifier(backlogId, username);
        Project project = projectRepository.findByProjectIdentifier(backlogId);
        if (project == null) {
            throw new ProjectNotFoundException("Project with id '" + backlogId + "' doesn't exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId.toUpperCase());
    }

    public ProjectTask findPTbyProjectSequence(String backlogId, String ptId, String username) {
        projectService.findProjectByIdentifier(backlogId, username);
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(ptId);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project with id '" + ptId + "' doesn't exists");
        }
        if (!projectTask.getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task '" + ptId + " does not exist in project: '" + backlogId);
        }
        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updateTask, String backlogId, String ptId, String username) {
        findPTbyProjectSequence(backlogId, ptId, username);
        return projectTaskRepository.save(updateTask);
    }

    public void deletePtByProjectSequence(String backlogId, String ptId, String username) {
        ProjectTask projectTask = findPTbyProjectSequence(backlogId, ptId, username);
        projectTaskRepository.delete(projectTask);
    }
}
