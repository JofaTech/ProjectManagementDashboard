import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { BasicUserDto } from '../services/basic-user.dto';
import { AnnouncementDto } from '../services/announcement.dto';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.css']
})

export class AnnouncementsPageComponent implements OnInit {
  // Announcements to display
  announcements: AnnouncementDto[] = [];

  // Form fields
  title: string = '';
  message: string = '';

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
    // Get company id and make sure it isn't null
    const companyId = this.sharedDataService.getSelectedCompanyId();

    if (!companyId) {
      console.error('Cannot post announcement: no company selected');
      return;
    }

    // Hard-code author for now
    const author: BasicUserDto = {
      id: 18,
      profile: {
        firstName: 'Greg',
        lastName: 'Hirsch',
        email: 'ghirsch@email.com',
        phone: '(000) 000-0000'
      },
      isAdmin: false,
      active: true,
      status: 'PENDING'
    }

    // Create announcement 
    const newAnnouncement: Omit<AnnouncementDto, 'id'> = {
      date: Date.now(),
      title: this.title.trim(),
      message: this.message.trim(),
      author
    };

    // POST
    fetch(`http://localhost:4200/company/${companyId}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnnouncement)
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to post announcement');
        return response.json();
      })
      .then((createdAnnouncement: AnnouncementDto) => {
        // Add new announcement to top of list
        this.announcements.unshift(createdAnnouncement);

        // Reset form fields and close modal
        this.title = '';
        this.message = '';
        this.closeCreateAnnouncement();
      })
      .catch(err => {
        console.error('Error posting announcement:', err);
      });
  }

  // Get announcements for corresponding company
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
