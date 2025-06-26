import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FullUserDto {
  id: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  active: boolean;
  admin: boolean;
  status: string;
}

export interface UserRequestDto {
  credentials: {
    username: string;
    password: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) {}

  getCompanyUsers(companyId: number): Observable<FullUserDto[]> {
    return this.http.get<FullUserDto[]>(`${this.baseUrl}/${companyId}/users`);
  }

  addUser(companyId: number, userDto: UserRequestDto): Observable<FullUserDto> {
    return this.http.post<FullUserDto>(
      `${this.baseUrl}/${companyId}/users`,
      userDto
    );
  }
}
