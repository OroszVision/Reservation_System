import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from "@angular/material/input";
import { MainContentComponent } from './components/main-content/main-content.component';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './components/registration/registration.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import { MenuComponent } from './components/menu/menu.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ColorPickerModule} from "ngx-color-picker";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { AdditionalFormComponent } from './components/additional-form/additional-form.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { AdditionalListComponent } from './components/additional-list/additional-list.component';
import {MatListModule} from "@angular/material/list";
import { AdditionalEditComponent } from './components/additional-edit/additional-edit.component';
import { ReservationEditComponent } from './components/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { DatePipe } from '@angular/common';
import { ReservationUsersListComponent } from './components/reservation-users-list/reservation-users-list.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import {MatTabsModule} from "@angular/material/tabs";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainContentComponent,
    RegistrationComponent,
    MenuComponent,
    AdditionalFormComponent,
    ReservationFormComponent,
    AdditionalListComponent,
    AdditionalEditComponent,
    ReservationEditComponent,
    ReservationListComponent,
    ReservationUsersListComponent,
    UserPermissionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    ColorPickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTabsModule
  ],
  providers: [ DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
