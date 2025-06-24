package com.cooksys.groupfinal.services;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;



public interface TeamService {

    TeamDto patchTeamProject(Long teamId, ProjectDto projectDto);

}
