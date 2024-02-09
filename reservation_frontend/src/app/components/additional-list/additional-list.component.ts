import { Component, OnInit } from '@angular/core';
import { AdditionalService } from "../../services/additional-service/additional.service";
import { Additional } from "../../model/additional.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-additional-list',
  templateUrl: './additional-list.component.html',
  styleUrls: ['./additional-list.component.css']
})
export class AdditionalListComponent implements OnInit {
  additionals: Additional[] = [];

  constructor(private additionalService: AdditionalService, public router: Router) { }

  ngOnInit(): void {
    this.fetchAdditionals();
  }

  fetchAdditionals(): void {
    this.additionalService.fetchAdditionals().subscribe(
      (data: Additional[]) => {
        this.additionals = data;
      },
      (error) => {
        console.error('Error fetching additionals:', error);
      }
    );
  }

  editAdditional(additional: Additional) {
    this.router.navigate(['/main/edit-additional',additional.id])
  }

  onDelete(additionalId: number): void {
    this.additionalService.deleteAdditional(additionalId).subscribe({
      next: () => {
        console.log('Additional deleted successfully');
        this.fetchAdditionals()
      },
      error: (err) => {
        console.error('Error deleting additional:', err);
        // Handle the error appropriately
      }
    });
  }

}
