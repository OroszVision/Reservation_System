import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showCompleted: boolean = false;
  userRole: string | null = null; // Definice proměnné pro uložení role uživatele

  constructor(private router: Router) {}
    navigateToAddAdditional(){
    this.router.navigate(['/main/add-additional'])
  }

    navigateToListAdditionals(){
    this.router.navigate(['/main/list-additionals'])
    }
  navigateToAddReservation() {
  this.router.navigate(['/main/add-reservation'])
  }

  navigateToListReservations() {
  this.router.navigate(['/main/list-reservation'])
  }

  navigateToUsersReservationList(){
    this.router.navigate(['/main/users-list-reservation'])
  }
  navigateToHandleUserPermissions() {
    this.router.navigate(['/main/user-permissions'])
  }
  ngOnInit() {
    const storedValue = localStorage.getItem('showCompleted');
    if (storedValue !== null) {
      this.showCompleted = JSON.parse(storedValue);
    }

    this.userRole = localStorage.getItem('role'); // Načtení role uživatele z localStorage
  }
  isUserAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }
}
