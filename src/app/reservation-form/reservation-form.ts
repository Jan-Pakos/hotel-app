import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm implements OnInit {
  guestEmail = '';

  ngOnInit() {
  }

  onSubmit() {

  }
}
