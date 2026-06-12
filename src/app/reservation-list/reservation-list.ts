import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  imports: [DatePipe, RouterModule],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList implements OnInit {
  reservations = signal<Reservation[]>([]);
  error = signal<string | null>(null);

  constructor(private reservationService: ReservationService, private router: Router) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe({
      next: data => this.reservations.set(data),
      error: err => this.error.set(`Failed to load reservations: ${err.status} ${err.message}`)
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.reservations.update(list => list.filter(r => r.id !== id));
    });
  }

  editReservation(id: string) {
    this.router.navigate(['/reservations/edit', id]);
  }
}
