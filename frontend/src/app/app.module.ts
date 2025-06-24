import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SelectCompanyPageComponent } from './select-company-page/select-company-page.component';
import { AnnouncementsPageComponent } from './announcements-page/announcements-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SelectCompanyPageComponent,
    AnnouncementsPageComponent
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
