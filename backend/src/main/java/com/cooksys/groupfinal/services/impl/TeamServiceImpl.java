package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;

    private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }

    private Project findProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return project.get();
    }

    @Override
    public ProjectDto addProject(Long id, ProjectDto projectDto) {
        Team team = findTeam(id);
        Project project = projectMapper.dtoToEntity(projectDto);

        project.setTeam(team);

        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }

    @Override
    public void deleteProject(Long id, Long projectId) {
        Team team = findTeam(id);
        Project project = findProject(projectId);

        if (!project.getTeam().getId().equals(team.getId())){
            throw new BadRequestException("Project does not belong to team");
        }

        team.getProjects().remove(project);
        project.setTeam(null);

        projectRepository.delete(project);
    }

}
