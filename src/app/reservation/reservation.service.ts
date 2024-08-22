import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = "http://localhost:3000"
  reservationList: Reservation[] = [];

  constructor(private http: HttpClient) {}

  getReservations() : Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservation(id: string) : Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation) : Observable<void> {
    reservation.id = Date.now().toString();
    return this.http.post<void>(this.apiUrl + '/reservation', reservation);
  }

  deleteReservation(id: string) : Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/reservation/' + id);
  }

  updateReservation(id: string, updatedReservation: Reservation) : Observable<void> {
    updatedReservation.id = Date.now().toString();
    return this.http.put<void>(this.apiUrl + '/reservation/' + id, updatedReservation);
  }
}
