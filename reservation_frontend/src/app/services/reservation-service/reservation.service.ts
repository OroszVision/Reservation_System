import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReservationDto } from '../../model/reservation-dto.model';
import { NotificationService } from '../notification-service/notification.service';
import { Router } from '@angular/router';
import {Reservation} from "../../model/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/api/v1';
  reservationsSubject: BehaviorSubject<ReservationDto[]> = new BehaviorSubject<ReservationDto[]>([]);

  constructor(private http: HttpClient, public notificationService: NotificationService, public router: Router) { }

  public fetchReservations(): Observable<Reservation[]> {
    const headers = this.getHeaders();
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation/user`, { headers });
  }

  createReservation(reservation: ReservationDto): Observable<ReservationDto> {
    const headers = this.getHeaders();
    return this.http.post<ReservationDto>(`${this.baseUrl}/reservation/create`, reservation, { headers });
  }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    });
  }

  private updateReservations(newReservation: ReservationDto): void {
    const currentReservations = this.reservationsSubject.getValue();
    const updatedReservations = [...currentReservations, newReservation];
    this.reservationsSubject.next(updatedReservations);
  }

  deleteReservation(reservationId: number): Observable<void> {
    const headers = this.getHeaders();
    const endpoint = `${this.baseUrl}/reservation/${reservationId}`;
    return this.http.delete<void>(endpoint, { headers });
  }

  private removeReservation(reservationId: number): void {
    let reservations = this.reservationsSubject.getValue();
    reservations = reservations.filter(reservation => reservation.id !== reservationId);
    this.reservationsSubject.next(reservations);
  }

  cleanup(): void {
    this.reservationsSubject.next([]);
  }

  updateReservation(reservation: ReservationDto): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.baseUrl}/reservation/${reservation.id}`, reservation, { headers });
  }

  // Method to get a reservation by ID
  getReservationById(id: number): Observable<ReservationDto> {
    const headers = this.getHeaders();
    return this.http.get<ReservationDto>(`${this.baseUrl}/reservation/${id}`, { headers });
  }
}
