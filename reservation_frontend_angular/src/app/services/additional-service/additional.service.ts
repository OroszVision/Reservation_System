import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Additional } from '../../model/additional.model';
import { NotificationService, NotificationType } from '../notification-service/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {
  private baseUrl = 'http://localhost:8080/api/v1';
  additionalSubject: BehaviorSubject<Additional[]> = new BehaviorSubject<Additional[]>([]);

  constructor(private http: HttpClient, public notificationService: NotificationService, public router: Router) { }

  public fetchAdditionals(): Observable<Additional[]> {
    const headers = this.getHeaders();
    return this.http.get<Additional[]>(`${this.baseUrl}/additional`, { headers });
  }

  createAdditional(additional: Additional): void {
    const headers = this.getHeaders();
    this.http.post<Additional>(`${this.baseUrl}/additional`, additional, { headers }).subscribe({
      next: (data: Additional) => {
        console.log('Additional created successfully:', additional);
        this.notificationService.showNotification("Additional created", NotificationType.Success);
        this.updateAdditionals(data);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.log(err);
        this.notificationService.showNotification("Additional was not created", NotificationType.Error);
      }
    });
  }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    });
  }

  private updateAdditionals(newAdditional: Additional): void {
    const currentAdditionals = this.additionalSubject.getValue();
    const updatedAdditionals = [...currentAdditionals, newAdditional];
    this.additionalSubject.next(updatedAdditionals);
  }

  deleteAdditional(additionalId: number): Observable<void> {
    const headers = this.getHeaders();
    const endpoint = `${this.baseUrl}/additional/${additionalId}`;
    return this.http.delete<void>(endpoint, { headers });
  }

  updateAdditional(additional: Additional): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.baseUrl}/additional/${additional.id}`, additional, { headers });
  }

  // Method to get an additional by ID
  getAdditionalById(id: number): Observable<Additional> {
    const headers = this.getHeaders();
    return this.http.get<Additional>(`${this.baseUrl}/additional/${id}`,{headers});
  }

  getAvailableAdditionals() {
    const headers = this.getHeaders();
    return this.http.get<Additional[]>(`${this.baseUrl}/additional/findAllAvailable`, { headers });
  }

}
