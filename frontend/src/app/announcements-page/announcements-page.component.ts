import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { BasicUserDto } from '../services/basic-user.dto';
import { AnnouncementDto } from '../services/announcement.dto';

// // Profile interface
// interface Profile {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// // Basicuser interface
// interface BasicUser {
//   id: number;
//   profile: Profile;
//   isAdmin: boolean;
//   active: boolean;
//   status: string;
// }

// Announcement interface
// interface Announcement {
//   id: number;
//   date: number; // timestamp
//   title: string;
//   message: string;
//   author: BasicUserDto;
// }

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.css']
})
export class AnnouncementsPageComponent implements OnInit {
  // Announcements to display
  announcements: AnnouncementDto[] = [];

  // Modal info
  showCreateAnnouncementModal = false;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  openCreateAnnouncement() {
    this.showCreateAnnouncementModal = true;
  }

  closeCreateAnnouncement() {
    this.showCreateAnnouncementModal = false;
  }

  submitNewAnnouncement() {
    // TODO: Implement POST logic to submit new announcement
    console.log('submitNewAnnouncement() called. Implementation pending')
  }

  fetchAnnouncements() {
    // Get company id for announcements to display:
    const companyId = this.sharedDataService.getSelectedCompanyId();

    // Make sure company id is not null
    if (!companyId) {
      console.error('No company selected');
      return;
    }

    fetch(`http://localhost:4200/company/${companyId}/announcements`)
      .then(response => response.json())
      .then((data: AnnouncementDto[]) => {
        console.log("announcements: ", data)
        this.announcements = data;
      })
      .catch(err => {
        console.error('Error fetching announcements:', err);
      });
  }

}
