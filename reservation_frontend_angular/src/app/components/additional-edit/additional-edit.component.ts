import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Additional } from '../../model/additional.model';
import { AdditionalService } from '../../services/additional-service/additional.service';

@Component({
  selector: 'app-edit-additional',
  templateUrl: './additional-edit.component.html',
  styleUrls: ['./additional-edit.component.css']
})
export class AdditionalEditComponent implements OnInit {
  additional: Additional = { id: 0, name: '', price: 0, available: true };
  originalAdditional: Additional | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private additionalService: AdditionalService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.additionalService.getAdditionalById(id).subscribe(
      (data: Additional) => {
        this.additional = { ...data }; // Copy fetched additional to prevent mutating original
        this.originalAdditional = { ...data }; // Store original additional
      },
      (error) => {
        console.error('Error fetching additional:', error);
      }
    );
  }

  onCancel() {
    // Navigate back to the additional list
    this.router.navigate(['/main/list-additionals']);
  }

  onSubmit(): void {
    this.additionalService.updateAdditional(this.additional).subscribe(
      () => {
        console.log('Additional updated successfully');
        this.router.navigate(['/main/list-additionals']);
      },
      (error) => {
        console.error('Error updating additional:', error);
      }
    );
  }
}
