import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {Additional} from "../../model/additional.model";
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation-service/reservation.service";
import {AdditionalService} from "../../services/additional-service/additional.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];
  additionals: Additional[] = [];

  constructor(private router: Router,
              private reservationService: ReservationService,
              private additionalService: AdditionalService) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadAdditionals(); // Call loadAdditionals() to fetch additionals
  }
  loadReservations(): void {
    this.reservationService.fetchReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  loadAdditionals(): void {
    this.additionalService.fetchAdditionals().subscribe(additionals => {
      this.additionals = additionals;
    });
  }

  editReservation(reservation: Reservation) {
    this.router.navigate(['/main/edit-reservation',reservation.id])
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        console.log('Additional deleted successfully');
        this.loadReservations()
      },
      error: (err) => {
        console.error('Error deleting additional:', err);
        // Handle the error appropriately
      }
    });
  }
}
