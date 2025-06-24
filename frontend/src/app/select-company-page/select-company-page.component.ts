import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-company-page',
  templateUrl: './select-company-page.component.html',
  styleUrls: ['./select-company-page.component.css']
})
export class SelectCompanyPageComponent {
  selectedCompany: string = '';

  constructor(private router: Router) {}

  submitCompany(): void {
    if (this.selectedCompany && this.selectedCompany !== '') {
      console.log('Company selected: ', this.selectedCompany);
      this.router.navigate(['/announcements']);
    } else {
      alert('Please select a company.');
    }
  }

}
