import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserDetails} from "../../model/user-details";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "../notification-service/notification.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient, public notificationService: NotificationService, public router: Router) { }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    });
  }

  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.baseUrl}/user`, { headers });
  }

  getUserDetails(userId: number): Observable<UserDetails> {
    const headers = this.getHeaders();
    return this.http.get<UserDetails>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  promoteUser(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<User>(`${this.baseUrl}/user/${userId}/promote`, null, { headers });
  }

  demoteUser(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<User>(`${this.baseUrl}/user/${userId}/demote`, null, { headers });
  }

}
