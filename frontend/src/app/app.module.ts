import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SelectCompanyPageComponent } from './select-company-page/select-company-page.component';
import { AnnouncementsPageComponent } from './announcements-page/announcements-page.component';
import { AnnouncementCard } from './announcements-page/announcement-card/announcement-card';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamsCardComponent } from './teams-page/teams-card/teams-card.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { CreateAnnouncementComponent } from './announcements-page/create-announcement/create-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SelectCompanyPageComponent,
    AnnouncementsPageComponent,
    AnnouncementCard,
    ProjectsPageComponent,
    NavbarComponent,
    TeamsPageComponent,
    TeamsCardComponent,
    UsersPageComponent,
    CreateAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
