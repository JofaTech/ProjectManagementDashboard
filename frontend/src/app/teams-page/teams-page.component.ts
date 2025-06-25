import { Component } from '@angular/core';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent {
  // Dummy data to represent teams:
  teams = [
    {
      name: 'Team 1',
      projectsCount: 4,
      members: ['Chris R.', 'Helena M.', 'Kenny W.', 'Will M.']
    },
    {
      name: 'Team2',
      projectsCount: 4,
      members: ['Chris R.', 'Helena M.']
    },
    {
      name: 'Team3',
      projectsCount: 4,
      members: ['Will M.', 'Helena M.', 'Kenny W.']
    },
    {
      name: 'Team4',
      projectsCount: 2,
      members: ['Kenny W.', 'Helena M.']
    },
    {
      name: 'Team5',
      projectsCount: 4,
      members: ['Will M.', 'Kenny W.']
    }
  ]

  showNewTeamModal = false;

  openNewTeamModal() {
    this.showNewTeamModal = true;
  }

  closeNewTeamModal() {
    this.showNewTeamModal = false;
  }
}
