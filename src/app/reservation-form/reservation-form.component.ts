import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { checkInBeforeCheckOutValidator } from './date.validator';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});
  today: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.today = this.getTodayDate();

    this.reservationForm = this.formBuilder.group({
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      guestName: new FormControl('', [Validators.required]),
      guestEmail: new FormControl('', [Validators.required, Validators.email]),
      roomNumber: new FormControl('', [Validators.required, Validators.min(1)])
    }, {validators: checkInBeforeCheckOutValidator() });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
      this.reservationService.getReservation(id).subscribe(
        reservation => {
          if(reservation) {
            this.reservationForm.patchValue(reservation);
          }
        }
      );
    }
  }

  get rf() {
    return this.reservationForm;
  }

  onSubmit() {
    if(this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      
      if(id) {
        this.reservationService.updateReservation(id, reservation).subscribe();
      } else {
        this.reservationService.addReservation(reservation).subscribe();
      }
      this.router.navigate(['/lists']);
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
