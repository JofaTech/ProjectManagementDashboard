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

  // Form fields
  teamName = '';
  description = '';

  // Dummy data for available members
  availableMembers = ['Chris P.', 'Wil M.', 'Helena M.', 'Kenny W.']

  selectedMembers: string[] = [];

  showNewTeamModal = false;

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
