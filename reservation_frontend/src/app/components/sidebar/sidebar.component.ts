import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showCompleted: boolean = false;
  selectedCategoryId: number | null = null;
  userRole: string | null = null; // Definice proměnné pro uložení role uživatele

  constructor(private router: Router, public authService: AuthService) {}
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
  onSlideToggleChange() {
    localStorage.setItem('showCompleted', JSON.stringify(this.showCompleted));
  }

  promoteUser() {

  }

  demoteUser() {

  }


}
