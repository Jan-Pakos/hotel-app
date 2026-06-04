import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm implements OnInit {
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
  
  }


  ngOnInit() {
    this.reservationForm = this.fb.group({
      guestEmail: ['', [Validators.required, Validators.email]],
      guestName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservation = this.reservationForm.value;
      this.reservationService.addReservation(reservation).subscribe(() => {
        this.reservationForm.reset();
      });
    }
  }
}
