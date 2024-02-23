import { Component } from '@angular/core';
import {UserDetails} from "../../model/user-details";
import {UserService} from "../../services/user-service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-reservation-users-list',
  templateUrl: './reservation-users-list.component.html',
  styleUrls: ['./reservation-users-list.component.css']
})
export class ReservationUsersListComponent {
  users: User[] = [];
  selectedUserId: number | undefined;
  selectedUserDetails: UserDetails | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onUserSelectionChange() {
    if (this.selectedUserId) {
      this.userService.getUserDetails(this.selectedUserId).subscribe(userDetails => {
        this.selectedUserDetails = userDetails;
      });
    }
  }
}

