import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  teamId!: number;
  teamName!: string;
  projects: Project[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParamMap;
    this.teamId = +(queryParams.get('id') || 0);
    this.teamName = queryParams.get('name') || 'Unknown Team';

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

  newProjectModal() {
    // TODO: We need to connect button to new project modal once created
  }

}
