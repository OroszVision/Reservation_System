import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalEditComponent } from './additional-edit.component';

describe('AdditionalEditComponent', () => {
  let component: AdditionalEditComponent;
  let fixture: ComponentFixture<AdditionalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalEditComponent]
    });
    fixture = TestBed.createComponent(AdditionalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
