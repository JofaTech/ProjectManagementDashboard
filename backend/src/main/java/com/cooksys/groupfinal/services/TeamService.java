package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface TeamService {

    ProjectDto addProject(Long id, ProjectDto projectDto);

    void deleteProject(Long companyId, Long projectId);

}
