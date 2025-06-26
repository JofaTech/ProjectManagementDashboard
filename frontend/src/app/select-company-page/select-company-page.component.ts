import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-company-page',
  templateUrl: './select-company-page.component.html',
  styleUrls: ['./select-company-page.component.css']
})
export class SelectCompanyPageComponent {
  selectedCompany: string = '';
  companies: any[] = [];

  constructor(private router: Router) {}

  //fetch compaines on page load
  ngOnInit(): void {
    this.fetchCompanies();
  }

  submitCompany(): void {
    if (this.selectedCompany && this.selectedCompany !== '') {
      console.log('Company selected: ', this.selectedCompany);
      this.router.navigate(['/announcements']);
    } else {
      alert('Please select a company.');
    }
  }

  fetchCompanies(): void {
  fetch('http://localhost:4200/company')
    .then(response => response.json())
    .then(data => {
      this.companies = data; // <--- this line was missing
      console.log('Companies fetched: ', this.companies);
    })
    .catch(error => {
      console.error('Error fetching companies:', error);
    });
  }

}
