import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { Router } from "@angular/router";
import { ReservationDto } from "../../model/reservation-dto.model";
import { ReservationService } from "../../services/reservation-service/reservation.service";
import { Additional } from "../../model/additional.model";
import { AdditionalService } from "../../services/additional-service/additional.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  reservations: ReservationDto[] = [];
  additionals: Additional[] = [];

  constructor(private authService: AuthService, private router: Router,
  ) { }



  logout() {
    this.authService.logout();
  }

  redirectToBoard() {
    this.router.navigate(['/main']);
  }


}
