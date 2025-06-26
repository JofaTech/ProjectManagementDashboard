import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _selectedCompanyId = new BehaviorSubject<number | null>(null);
  selectedCompanyId$: Observable<number | null> = this._selectedCompanyId.asObservable();

  constructor() { }

  // Update company id
  setSelectedCompanyId(newId: number): void {
    this._selectedCompanyId.next(newId);
  }

  getSelectedCompanyId(): number | null {
    return this._selectedCompanyId.getValue();
  }
}
