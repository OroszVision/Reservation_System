import { Component, OnInit } from '@angular/core';
import { AdditionalService } from "../../services/additional-service/additional.service";
import { Additional } from "../../model/additional.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-additional-list',
  templateUrl: './additional-list.component.html',
  styleUrls: ['./additional-list.component.css']
})
export class AdditionalListComponent implements OnInit {
  additionals: Additional[] = [];
  paginatedAdditionals: Additional[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  searchTerm: string = '';
  sortType: string = '';

  constructor(private additionalService: AdditionalService, public router: Router) { }

  ngOnInit(): void {
    this.fetchAdditionals();
  }

  fetchAdditionals(): void {
    this.additionalService.fetchAdditionals().subscribe(
      (data: Additional[]) => {
        this.additionals = data;
        this.sortData();
        this.updatePaginatedAdditionals();
      },
      (error) => {
        console.error('Error fetching additionals:', error);
      }
    );
  }

  editAdditional(additional: Additional) {
    this.router.navigate(['/main/edit-additional', additional.id])
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedAdditionals();
  }

  onSearch(): void {
    this.sortType = ''; // Reset sort type when searching
    this.sortData();
    this.updatePaginatedAdditionals();
  }

  sortByName(): void {
    this.sortType = 'name';
    this.sortData();
    this.updatePaginatedAdditionals();
  }

  sortByPrice(): void {
    this.sortType = 'price';
    this.sortData();
    this.updatePaginatedAdditionals();
  }

  sortByAvailability(): void {
    this.sortType = 'availability';
    this.sortData();
    this.updatePaginatedAdditionals();
  }

  sortData(): void {
    if (this.sortType === 'name') {
      this.additionals.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortType === 'price') {
      this.additionals.sort((a, b) => a.price - b.price);
    } else if (this.sortType === 'availability') {
      this.additionals.sort((a, b) => a.available === b.available ? 0 : a.available ? -1 : 1);
    }
  }

  updatePaginatedAdditionals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAdditionals = this.additionals.slice(startIndex, endIndex);
  }
}
