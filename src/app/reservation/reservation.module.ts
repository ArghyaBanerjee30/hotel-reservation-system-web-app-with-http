import { NgModule } from "@angular/core";
import { ReservationFormComponent } from "../reservation-form/reservation-form.component";
import { ReservationListComponent } from "../reservation-list/reservation-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomeModule } from "../home/home.module";

@NgModule({
    declarations: [
        ReservationFormComponent,
        ReservationListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HomeModule,
    ],
})

export class ReservationModule {}