import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationService } from "../../services/reservation-service/reservation.service";
import { Additional } from "../../model/additional.model";
import { AdditionalService } from "../../services/additional-service/additional.service";
import { Observable } from 'rxjs';
import { ReservationDto } from "../../model/reservation-dto.model";
import { Reservation } from "../../model/reservation.model";

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  reservationForm!: FormGroup;
  additionals: Additional[] = [];
  reservationId!: number;
  originalReservation: Reservation | undefined;

  constructor(private fb: FormBuilder,
              private reservationService: ReservationService,
              private additionalService: AdditionalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.params['id'];

    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      arrival: [new Date(), Validators.required],
      departure: [new Date(), Validators.required],
      selectedAdditionals: [[]],
    });

    this.additionalService.getAvailableAdditionals().subscribe({
      next: (additionals: Additional[]) => {
        this.additionals = additionals;
        this.fetchReservationDetails(this.reservationId);
      },
      error: (error: any) => {
        console.error('Error fetching available additionals:', error);
      }
    });
  }

  fetchReservationDetails(id: number): void {
    this.reservationService.getReservationById(id).subscribe({
      next: (reservation: ReservationDto) => {
        this.originalReservation = { ...reservation }; // Store original reservation data
        this.reservationForm.patchValue({
          name: reservation.name,
          arrival: new Date(reservation.arrival),
          departure: new Date(reservation.departure),
          selectedAdditionals: reservation.additionalIds
        });
      },
      error: (error: any) => {
        console.error('Error fetching reservation details:', error);
      }
    });
  }


  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;

      const reservationData: ReservationDto = {
        id: this.reservationId,
        name: formData.name,
        arrival: formData.arrival.toISOString(), // Convert date to ISO string
        departure: formData.departure.toISOString(), // Convert date to ISO string
        additionalIds: formData.selectedAdditionals
      };
      console.log(reservationData)

      this.updateReservation(reservationData).subscribe({
        next: () => {
          console.log('Reservation updated successfully');
          this.router.navigate(['/main']);
        },
        error: (error: any) => {
          console.error('Error updating reservation:', error);
        }
      });
    }
  }

  updateReservation(reservation: ReservationDto): Observable<void> {
    return this.reservationService.updateReservation(reservation);
  }
}
