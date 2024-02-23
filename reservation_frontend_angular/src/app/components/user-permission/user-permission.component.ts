import { Component } from '@angular/core';
import { User } from "../../model/user";
import { UserService } from "../../services/user-service/user.service";
import { MatListOption } from '@angular/material/list';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent {
  promotedUsers: User[] = [];
  demotedUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.promotedUsers = users.filter(user => user.role === 'USER');
      this.demotedUsers = users.filter(user => user.role === 'ADMIN');
    });
  }

  promoteSelected(selectedOptions: MatListOption[]): void {
    const selectedUsers: User[] = selectedOptions.map(option => option.value);
    const promoteRequests = selectedUsers.map(user => this.userService.promoteUser(user.id));

    forkJoin(promoteRequests).subscribe(
      () => {
        console.log('All users promoted successfully');
        this.loadUsers(); // Reload the list of users
      },
      error => {
        console.error('Error promoting users:', error);
        // Optionally, handle error scenarios
      }
    );
  }

  demoteSelected(selectedOptions: MatListOption[]): void {
    const selectedUsers: User[] = selectedOptions.map(option => option.value);
    const demoteRequests = selectedUsers.map(user => this.userService.demoteUser(user.id));

    forkJoin(demoteRequests).subscribe(
      () => {
        console.log('All users demoted successfully');
        this.loadUsers(); // Reload the list of users
      },
      error => {
        console.error('Error demoting users:', error);
        // Optionally, handle error scenarios
      }
    );
  }
}
