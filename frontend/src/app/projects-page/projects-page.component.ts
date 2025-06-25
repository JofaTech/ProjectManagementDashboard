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

  // Create Project Fields
  showCreateProjectModal = false;
  newProjectForm!: FormGroup

  // Edit Project Fields
  showEditProjectModal = false;
  editProjectForm!: FormGroup;
  statusDropdownOpen = false;

  // Track project being edited
  editingProjectId: number | null = null;

  teamId!: number;
  teamName!: string;
  projects: Project[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize fields for team projects to display
    const queryParams = this.route.snapshot.queryParamMap;
    this.teamId = +(queryParams.get('id') || 0);
    this.teamName = queryParams.get('name') || 'Unknown Team';

    // Initialize create project form
    this.newProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Initialize edit project form
    this.editProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      status: [null, Validators.required]
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
    this.newProjectForm.reset();
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
  openEditProjectModal(project: Project) {
    this.editingProjectId = project.id;
    this.showEditProjectModal = true;

    // Populate form with selected project data
    this.editProjectForm.setValue({
      projectName: project.title,
      description: project.description,
      status: project.status.toLowerCase() === 'active' ? 'Yes' : 'No'
    });

    this.statusDropdownOpen = false;
  }

  closeEditProjectModal() {
    this.showEditProjectModal = false;
    // Reset project form, id, and such
    this.editProjectForm.reset();
    this.editingProjectId = null;
    this.statusDropdownOpen = false;
  }

  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
  }

  selectStatus(value: 'Yes' | 'No') {
    console.log('selectStatus called with', value);

    this.editProjectForm.patchValue({ status: value });
    this.toggleStatusDropdown()
  }

  submitEditedProject() {
    if (this.editProjectForm.valid && this.editingProjectId !== null) {
      const editedProjectIndex = this.projects.findIndex(p => p.id === this.editingProjectId);
      if (editedProjectIndex !== -1) {
        const updatedProject: Project = {
          id: this.editingProjectId,
          title: this.editProjectForm.value.projectName,
          description: this.editProjectForm.value.description,
          status: this.editProjectForm.value.status === 'Yes' ? 'Active' : 'Inactive'
        };

        // Placeholder for POST integration
        console.log('Updating Project:', updatedProject);

        // Update locally (may not be necessary later)
        this.projects[editedProjectIndex] = updatedProject;

      }

      this.closeEditProjectModal();
    }
  }

}
