import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainContentComponent} from "./components/main-content/main-content.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {RegistrationComponent} from "./components/registration/registration.component";
import {AdditionalFormComponent} from "./components/additional-form/additional-form.component";
import {ReservationFormComponent} from "./components/reservation-form/reservation-form.component";
import {AdditionalListComponent} from "./components/additional-list/additional-list.component";
import {AdditionalEditComponent} from "./components/additional-edit/additional-edit.component";
import {ReservationEditComponent} from "./components/reservation-edit/reservation-edit.component";
import {ReservationListComponent} from "./components/reservation-list/reservation-list.component";
import {ReservationUsersListComponent} from "./components/reservation-users-list/reservation-users-list.component";
import {UserPermissionComponent} from "./components/user-permission/user-permission.component";

const mainRoutes: Routes = [
  { path: 'add-additional', component: AdditionalFormComponent},
  { path: 'edit-additional/:id', component: AdditionalEditComponent},
  { path: 'list-additionals', component: AdditionalListComponent},
  { path: 'add-reservation', component: ReservationFormComponent},
  { path: 'list-reservation', component: ReservationListComponent},
  { path: 'users-list-reservation', component: ReservationUsersListComponent},
  { path: 'edit-reservation/:id', component: ReservationEditComponent},
  { path: 'user-permissions', component: UserPermissionComponent},

];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainContentComponent, canActivate: [AuthGuardService], children: mainRoutes},
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
