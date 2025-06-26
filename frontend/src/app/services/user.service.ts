import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicUserDto } from './basic-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/company';

  constructor(private http: HttpClient) { }

  getUsersByCompanyId(companyId: number): Observable<BasicUserDto[]> {
    return this.http.get<BasicUserDto[]>(`${this.API_URL}/${companyId}/users`);
  }
}
