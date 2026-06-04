import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  imports: [DatePipe],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList {
  reservations: Reservation[];

  constructor(private reservationService: ReservationService) {
    this.reservations = this.reservationService.getReservations();
  }
}
