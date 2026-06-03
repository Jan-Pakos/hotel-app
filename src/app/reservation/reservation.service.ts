import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
   }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  updateReservation(id: string, updated: Partial<Reservation>): void {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservations[index] = { ...this.reservations[index], ...updated };
    }
  }

  deleteReservation(id: string): void {
    this.reservations = this.reservations.filter(r => r.id !== id);
  }

}
