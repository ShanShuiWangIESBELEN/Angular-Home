import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  applyForm!: FormGroup;
  casas: any[] = [];

  newCasa = {
    name: '',
    city: '',
    state: '',
    photo: '',
    availableUnits: 0,
    wifi: false,
    laundry: false,
    security: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor(private housingService: HousingService) { }

  ngOnInit() {
    this.applyForm = new FormGroup({
      name: new FormControl(this.newCasa.name, Validators.required),
      city: new FormControl(this.newCasa.city, Validators.required),
      state: new FormControl(this.newCasa.state, Validators.required),
      photo: new FormControl(this.newCasa.photo),
      availableUnits: new FormControl(this.newCasa.availableUnits, [Validators.required, Validators.min(1)]),
      wifi: new FormControl(this.newCasa.wifi),
      laundry: new FormControl(this.newCasa.laundry),
      security: new FormControl(this.newCasa.security, Validators.required),
      latitude: new FormControl(this.newCasa.coordinates.latitude, Validators.required),
      longitude: new FormControl(this.newCasa.coordinates.longitude, Validators.required)
    });

    this.housingService.getAllHousingLocations().then(data => {
      this.casas = data;
    });
  }

  registrarCasa() {
    if (this.applyForm.valid) {
      const allCasas = this.casas;
      const newId = allCasas.length > 0 ? Math.max(...allCasas.map(casa => casa.id)) + 1 : 1;
      const casaToAdd = { id: newId, ...this.applyForm.value, coordinates: { latitude: this.applyForm.value.latitude, longitude: this.applyForm.value.longitude } };
      this.casas.push(casaToAdd);
      console.log('Casa registrada:', casaToAdd);
      // Reset the form
      this.applyForm.reset({
        name: '',
        city: '',
        state: '',
        photo: '',
        availableUnits: 0,
        wifi: false,
        laundry: false,
        security: '',
        latitude: 0,
        longitude: 0
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}


