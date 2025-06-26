import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

// company interface
interface Company {
  id: number;
  name: string
}

@Component({
  selector: 'app-select-company-page',
  templateUrl: './select-company-page.component.html',
  styleUrls: ['./select-company-page.component.css']
})
export class SelectCompanyPageComponent implements OnInit {
  // companies to display and id
  companies: Company[] = [];
  selectedCompany: number | null = null;

  selectedCompanyName: string = '';

  constructor(private router: Router, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies() {
    fetch('http://localhost:4200/company')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data: Company[]) => {
        this.companies = data;
      })
      .catch(err => {
        console.error('Error fetching companies:', err);
      });
  }

  onCompanyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCompany = selectElement.value ? +selectElement.value : null;
    console.log('Selected company changed:', this.selectedCompany);
  }

  submitCompany(): void {
    if (this.selectedCompany !== null && this.selectedCompany !== undefined) {
      this.sharedDataService.setSelectedCompanyId(this.selectedCompany);
      this.router.navigate(['/announcements']);
      console.log('selectedCompanyId:', this.sharedDataService.getSelectedCompanyId())
    } else {
      alert('Please select a company')
    }
  }

}
