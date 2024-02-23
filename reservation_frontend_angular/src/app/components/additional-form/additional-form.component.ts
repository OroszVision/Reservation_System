import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalService } from "../../services/additional-service/additional.service";

@Component({
  selector: 'app-additional-form',
  templateUrl: './additional-form.component.html',
  styleUrls: ['./additional-form.component.css']
})
export class AdditionalFormComponent {
  additionalForm: FormGroup;

  constructor(private fb: FormBuilder, private additionalService: AdditionalService) {
    this.additionalForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      available: [true, [Validators.required]]
    });
  }

  createAdditional() {
    if (this.additionalForm.valid) {
      const additionalRequest = this.additionalForm.value;
      this.additionalService.createAdditional(additionalRequest);
      console.log('Creating additional service:', additionalRequest);
    }
  }
}
