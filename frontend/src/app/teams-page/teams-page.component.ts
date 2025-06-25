import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent {
  // Dummy data to represent teams:
  teams = [
    {
      id: 1,
      name: 'Team 1',
      projectsCount: 4,
      members: ['Chris R.', 'Helena M.', 'Kenny W.', 'Will M.']
    },
    {
      id: 2,
      name: 'Team2',
      projectsCount: 4,
      members: ['Chris R.', 'Helena M.']
    },
    {
      id: 3,
      name: 'Team3',
      projectsCount: 4,
      members: ['Will M.', 'Helena M.', 'Kenny W.']
    },
    {
      id: 4,
      name: 'Team4',
      projectsCount: 2,
      members: ['Kenny W.', 'Helena M.']
    },
    {
      id: 5,
      name: 'Team5',
      projectsCount: 4,
      members: ['Will M.', 'Kenny W.']
    }
  ]

  // Form fields
  teamName = '';
  description = '';

  // Dummy data for available members
  availableMembers = ['Chris P.', 'Wil M.', 'Helena M.', 'Kenny W.']

  selectedMembers: string[] = [];

  showNewTeamModal = false;

  constructor(private router: Router) { }

  // Routing to projects's page
  goToProjects(teamId: number, teamName: string) {
    this.router.navigate(['/projects'], { queryParams: { id: teamId, name: teamName } });
  }

  // Methods for selecting + removing members
  onMemberSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const member = selectElement.value;

    // Make sure member exists and is not a part of selected members array already
    if (member && !this.selectedMembers.includes(member)) {
      this.selectedMembers.push(member);
    }
  }

  removeMember(member: string) {
    this.selectedMembers = this.selectedMembers.filter(m => m !== member);
  }

  // Open and close modal methods
  openNewTeamModal() {
    this.showNewTeamModal = true;
  }

  closeNewTeamModal() {
    this.showNewTeamModal = false;
  }

  // Method for submitting new team to database
  submitNewTeam() {
    // TODO: Implement POST logic to submit new team
    console.log('submitNewTeam() called. Implementation pending. New Team:', {
      teamName: this.teamName,
      description: this.description,
      members: this.selectedMembers
    })

    // Close team modal
    this.closeNewTeamModal()

    // Clear form data for next time
    this.teamName = '';
    this.description = '';
    this.selectedMembers = [];
  }
}
