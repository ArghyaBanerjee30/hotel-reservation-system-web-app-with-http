import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
})
export class ReservationListComponent {
  reservationList: Reservation[] = [];

  constructor(
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe({
      next: (reserevations) => this.reservationList = reserevations,
      error: (err) => console.error('Error fetching reservations', err)
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe();
  }
}
