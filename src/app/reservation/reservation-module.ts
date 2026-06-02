import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationForm } from '../reservation-form/reservation-form';
import { ReservationList } from '../reservation-list/reservation-list';

@NgModule({
  imports: [CommonModule, ReservationForm, ReservationList],
  exports: [ReservationForm, ReservationList],
})
export class ReservationModule {}
