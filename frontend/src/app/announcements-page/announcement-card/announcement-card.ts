import { Component, Input } from '@angular/core';

// Profile interface
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Basicuser interface
interface BasicUser {
  id: number;
  profile: Profile;
  isAdmin: boolean;
  active: boolean;
  status: string;
}

// Announcement interface
interface Announcement {
  id: number;
  date: number; // timestamp
  title: string;
  message: string;
  author: BasicUser;
}

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.html',
  styleUrls: ['./announcement-card.css']
})
export class AnnouncementCard {
  @Input() announcement!: Announcement;

  get formattedDate(): string {
    // Format date
    const dateObj = new Date(this.announcement.date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  get authorName(): string {
    const author = this.announcement.author;
    const profile = author?.profile;
    if (!profile) {
      return 'Unknown';
    }
    return `${profile.firstName} ${profile.lastName}, ${author.status}`;
  }
}
