import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, MapaComponent],
  template: `
   <article>
    <img
      class="listing-photo"
      [src]="housingLocation?.photo"
      alt="Exterior photo of {{ housingLocation?.name }}"
      crossorigin
    />
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{ housingLocation?.availableUnits }}</li>
        <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
        <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <app-mapa *ngIf="housingLocation?.coordinates" [latitude]="housingLocation?.coordinates?.latitude ?? 0" [longitude]="housingLocation?.coordinates?.longitude ?? 0"></app-mapa>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" />
        <p *ngIf="applyForm.get('firstName')?.invalid && (applyForm.get('firstName')?.touched)"
            style="color: red; margin-bottom: 10px">
          First name is obligatory
        </p>
        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName" />
        <p *ngIf="applyForm.get('lastName')?.invalid && (applyForm.get('lastName')?.touched)"
            style="color: red; margin-bottom: 10px">
          Last name is obligatory
        </p>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" />
        <p *ngIf="applyForm.get('email')?.invalid && (applyForm.get('email')?.touched)"
            style="color: red; margin-bottom: 10px">
          Incorrect email format
        </p>
        <button *ngIf="applyForm.valid" type="submit" class="primary">Apply now</button>
        <button style="background-color: lightgrey; border-color: lightgrey"
            *ngIf="!applyForm.valid" type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  ngOnInit() {
    const formData = JSON.parse(localStorage.getItem("formData") ?? "{}");
    this.applyForm.setValue({
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || ''
    });
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
      );
      localStorage.setItem("formData", JSON.stringify(this.applyForm.value));
    }
  }
}