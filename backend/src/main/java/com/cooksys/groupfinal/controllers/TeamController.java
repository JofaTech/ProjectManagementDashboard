package com.cooksys.groupfinal.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

	private final TeamService teamService;

	@PostMapping("/{id}/project")
	@ResponseStatus(HttpStatus.CREATED)
	public ProjectDto addProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
		return teamService.addProject(id, projectDto);
	}

	@DeleteMapping("/{id}/project")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProject(@PathVariable Long id, @RequestBody Long projectId) {
		teamService.deleteProject(id, projectId);
	}

}
