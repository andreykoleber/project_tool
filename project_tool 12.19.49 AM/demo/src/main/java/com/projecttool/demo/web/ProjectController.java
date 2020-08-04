package com.projecttool.demo.web;

import com.projecttool.demo.domain.Project;
import com.projecttool.demo.services.MapValidationErrorService;
import com.projecttool.demo.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }
        Project newProject = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectIdentifier, Principal principal) {
        Project project = projectService.findProjectByIdentifier(projectIdentifier.toUpperCase(), principal.getName());
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal) { return projectService.findAllProjects(principal.getName()); }

    @DeleteMapping("/{projectIdentifier}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifier, Principal principal) {
        projectService.deleteProjectByIdentifier(projectIdentifier, principal.getName());
        return new ResponseEntity<>("Project with identifier '" + projectIdentifier.toUpperCase() + "' was deleted", HttpStatus.OK);
    }
}
