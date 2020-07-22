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

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();
            backlog.setPTSequence(++backlogSequence);
            projectTask.setProjectSequence(projectIdentifier + "-" +  backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
                projectTask.setPriority(3);
            }

            if (StringUtils.isEmpty(projectTask.getStatus())) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception ex) {
            throw new ProjectNotFoundException("Project not found");
        }
    }


    public Iterable<ProjectTask> findBacklogById(String backlogId) {
        Project project = projectRepository.findByProjectIdentifier(backlogId);
        if (project == null) {
            throw new ProjectNotFoundException("Project with id '" + backlogId + "' doesn't exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId.toUpperCase());
    }

    public ProjectTask findPTbyProjectSequence(String backlogId, String ptId) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with id '" + backlogId + "' doesn't exists");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(ptId);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project with id '" + ptId + "' doesn't exists");
        }

        if (!projectTask.getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task '" + ptId + " does not exist in project: '" + backlogId);
        }
        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updateTask, String backlogId, String ptId) {
        ProjectTask projectTask = findPTbyProjectSequence(backlogId, ptId);
        projectTask = updateTask;
        return projectTaskRepository.save(updateTask);
    }

    public void deletePtByProjectSequence(String backlogId, String ptId) {
        ProjectTask projectTask = findPTbyProjectSequence(backlogId, ptId);
        projectTaskRepository.delete(projectTask);
    }
}
