import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationForm } from '../reservation-form/reservation-form';
import { ReservationList } from '../reservation-list/reservation-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReservationForm, ReservationList],
  exports: [ReservationForm, ReservationList],
})
export class ReservationModule {}
