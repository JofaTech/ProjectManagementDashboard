import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent {

  constructor(private router: Router) { }

  goBackToTeams() {
    this.router.navigate(['teams']);
  }

  newProjectModal() {
    // TODO: We need to connect button to new project modal once created
  }

}
