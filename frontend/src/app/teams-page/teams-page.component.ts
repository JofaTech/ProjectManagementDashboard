import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService, TeamDto } from '../services/team.service';
import { UserService } from '../services/user.service';
import { BasicUserDto } from '../services/basic-user.dto';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  teams: TeamDto[] = []
  teamName: string = '';
  description: string = '';
  selectedMembers: BasicUserDto[] = [];
  availableMembers: BasicUserDto[] = [];
  showNewTeamModal: boolean = false;
  companyId = 6; // TODO: need to replace later with real data

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit is running...');
    this.teamService.getTeamsByCompanyId(this.companyId).subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error('Error fetching teams: ', err)
    });

    this.userService.getUsersByCompanyId(this.companyId).subscribe({
      next: (users) => this.availableMembers = users,
      error: (err) => console.error('Error fetching users: ', err)
    })
  }

  // Routing to projects's page
  goToProjects(teamId: number, teamName: string) {
    this.router.navigate(['/projects'], { 
      queryParams: {
        id: teamId,
        name: teamName,
        companyId: this.companyId
      }
    });
  }

  // Methods for selecting + removing members
  onMemberSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const userId = +selectElement.value;
    const user = this.availableMembers.find(u => u.id === userId);

    // Make sure member exists and is not a part of selected members array already
    if (user && !this.selectedMembers.find(m => m.id === user.id)) {
      this.selectedMembers.push(user);
    }

    selectElement.value = '';
  }

  removeMember(member: BasicUserDto) {
    this.selectedMembers = this.selectedMembers.filter(m => m.id !== member.id);
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
    const newTeam: TeamDto = {
      name: this.teamName,
      description: this.description,
      teammates: this.selectedMembers
    };

    this.teamService.postTeamToCompany(this.companyId, newTeam).subscribe({
      next: (team) => {
        console.log('Team created: ', team);
        this.teams.push(team);
        this.closeNewTeamModal();
        this.clearForm();
      },
      error: (err) => {
        console.error('Failed to create team: ', err);
      }
    });
  }

  clearForm() {
    this.teamName = '';
    this.description = '';
    this.selectedMembers = [];
  }

}
