import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm implements OnInit {
  reservationForm!: FormGroup;
  editId = signal<string | null>(null);
  submitError = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      guestEmail: ['', [Validators.required, Validators.email]],
      guestName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.reservationService.getReservationById(id).subscribe({
        next: reservation => {
          const toDateInput = (d: any) => d ? new Date(d).toISOString().split('T')[0] : '';
          this.reservationForm.patchValue({
            guestEmail: reservation.guestEmail,
            guestName: reservation.guestName,
            checkInDate: toDateInput(reservation.checkInDate),
            checkOutDate: toDateInput(reservation.checkOutDate),
            roomNumber: reservation.roomNumber,
          });
        },
        error: err => this.submitError.set(`Failed to load reservation: ${err.status} ${err.message}`)
      });
    }
  }

  onSubmit() {
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.invalid) return;

    this.submitError.set(null);
    const id = this.editId();
    if (id) {
      this.reservationService.updateReservation(id, this.reservationForm.value).subscribe({
        next: () => this.router.navigate(['/reservations']),
        error: err => this.submitError.set(`Failed to update: ${err.status} ${err.message}`)
      });
    } else {
      this.reservationService.addReservation(this.reservationForm.value).subscribe({
        next: () => this.reservationForm.reset(),
        error: err => this.submitError.set(`Failed to create: ${err.status} ${err.message}`)
      });
    }
  }
}
