import { Component } from '@angular/core';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.css']
})
export class AnnouncementsPageComponent {
  showCreateAnnouncementModal = false;

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
    fetch(`http://localhost:4200/company/6/announcements`)
      .then(response => response.json())
      .then(data => {
        console.log("announcements: ", data)
      })
  }

}
