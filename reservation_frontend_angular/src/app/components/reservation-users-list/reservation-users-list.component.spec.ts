import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUsersListComponent } from './reservation-users-list.component';

describe('ReservationUsersListComponent', () => {
  let component: ReservationUsersListComponent;
  let fixture: ComponentFixture<ReservationUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationUsersListComponent]
    });
    fixture = TestBed.createComponent(ReservationUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
