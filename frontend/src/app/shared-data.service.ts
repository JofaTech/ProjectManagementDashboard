import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private readonly COMPANY_STORAGE_KEY = 'selectedCompanyId';

  private _selectedCompanyId = new BehaviorSubject<number | null>(
    localStorage.getItem(this.COMPANY_STORAGE_KEY) ? +localStorage.getItem(this.COMPANY_STORAGE_KEY)! : null
  );
  selectedCompanyId$: Observable<number | null> = this._selectedCompanyId.asObservable();

  constructor() { }

  // Update company id
  setSelectedCompanyId(newId: number): void {
    localStorage.setItem(this.COMPANY_STORAGE_KEY, newId.toString());
    this._selectedCompanyId.next(newId);
  }

  getSelectedCompanyId(): number | null {
    return this._selectedCompanyId.getValue();
  }
}
