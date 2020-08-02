package com.projecttool.demo.web;

import com.projecttool.demo.domain.ProjectTask;
import com.projecttool.demo.services.MapValidationErrorService;
import com.projecttool.demo.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addProjectBacklog(@Valid @RequestBody ProjectTask projectTask,
                                               BindingResult result,
                                               @PathVariable String backlogId,
                                               Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlogId, projectTask, principal.getName());
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogId, Principal principal) {
            return projectTaskService.findBacklogById(backlogId, principal.getName());
    }

    @GetMapping("/{backlogId}/{ptId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String ptId, Principal principal) {
        ProjectTask projectTask = projectTaskService.findPTbyProjectSequence(backlogId, ptId, principal.getName());
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogId}/{ptId}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlogId,
                                               @PathVariable String ptId,
                                               Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, ptId, principal.getName());
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/{backlogId}/{ptId}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String ptId, Principal principal) {
        projectTaskService.deletePtByProjectSequence(backlogId, ptId, principal.getName());
        return new ResponseEntity<>("ProjectTask '" + ptId + "' was deleted successfully", HttpStatus.OK);
    }
}
