import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  // Modal Bools
  showCreateProjectModal = false;
  showEditProjectModal = false;

  // Create Project Fields
  newProjectForm!: FormGroup

  teamId!: number;
  teamName!: string;
  projects: Project[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize fields for team projects to display
    const queryParams = this.route.snapshot.queryParamMap;
    this.teamId = +(queryParams.get('id') || 0);
    this.teamName = queryParams.get('name') || 'Unknown Team';

    // Initialize fields for creating projects
    this.newProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load Projects
    this.loadProjects(this.teamId);
  }

  loadProjects(teamId: number) {
    const dummyProjects = {
      1: [
        { id: 1, title: 'Project 1', description: 'Learn ipsum this project is about stuff', status: 'Active' },
        { id: 2, title: 'Project 2', description: 'Learn ipsum this project is about stuff', status: 'Active' },
        { id: 3, title: 'Project 3', description: 'Learn ipsum this project is about stuff', status: 'Inactive' },
        { id: 4, title: 'Project 4', description: 'Learn ipsum this project is about stuff', status: 'Active' },
      ]
    };

    this.projects = dummyProjects[teamId as unknown as keyof typeof dummyProjects] || [];
  }

  goBackToTeams() {
    this.router.navigate(['teams']);
  }

  // Create Project Modal Methods
  openCreateProjectModal() {
    this.showCreateProjectModal = true;
  }

  closeCreateProjectModal() {
    this.showCreateProjectModal = false;
  }

  submitNewProject() {
    // Check for valid new project form before creatingnew project
    if (this.newProjectForm.valid) {
      const newProject = {
        title: this.newProjectForm.value.projectName,
        description: this.newProjectForm.value.description,
        status: 'Active'
      };

      // Log project to submit for now
      console.log('New project to submit:', newProject);

      // POST integration shall go here somewhere

      // Add new project to local list (for now, may not be necessary after integration)
      this.projects.push({
        id: this.projects.length + 1,
        ...newProject
      });

      this.closeCreateProjectModal();
    }
  }

  // Edit Project Modal Methods
  openEditProjectModal() {
    this.showEditProjectModal = true;
  }

  closeEditProjectModal() {
    this.showEditProjectModal = false;
  }

}
