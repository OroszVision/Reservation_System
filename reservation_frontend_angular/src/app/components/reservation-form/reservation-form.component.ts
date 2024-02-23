import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from "../../services/reservation-service/reservation.service";
import { ReservationDto } from "../../model/reservation-dto.model";
import { Additional } from "../../model/additional.model";
import { AdditionalService } from "../../services/additional-service/additional.service";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  additionals: Additional[] = []; // Define additionals property

  constructor(private fb: FormBuilder, private reservationService: ReservationService,
              private additionalService: AdditionalService, private router: Router) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
      selectedAdditionals: [[]], // Initialize as empty array
    });

    // Fetch available additionals from the service
    this.additionalService.getAvailableAdditionals().subscribe({
      next: (additionals: Additional[]) => {
        this.additionals = additionals;
      },
      error: (error: any) => {
        console.error('Error fetching available additionals:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;
      console.log('Form data before extraction:', formData);

      const reservationData: ReservationDto = {
        name: formData.name,
        arrival: formData.arrival,
        departure: formData.departure,
        additionalIds: formData.selectedAdditionals
      };

      // Log the reservation data to see its structure and data
      console.log('Data being sent to backend:', reservationData);

      this.reservationService.createReservation(reservationData).subscribe({
        next: (createdReservation) => {
          console.log('Reservation created successfully:', createdReservation);
          // Navigate to the main page after successful creation
          this.router.navigate(['/main/list-reservation']);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          // Handle error, e.g., show error message
        }
      });
    }
  }
}
