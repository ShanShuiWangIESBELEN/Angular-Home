import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  /* Me he quedado blanco de como hacer un injeccion, y lo hecho con la manera tonta  */
  casas = [
    {
      "locations": [
        {
          "id": 0,
          "name": "Acme Fresh Start Housing",
          "city": "Chicago",
          "state": "IL",
          "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
          "availableUnits": 4,
          "wifi": true,
          "laundry": true,
          "coordinates": {
            "latitude": 41.8781,
            "longitude": -87.6298
          },
          "security": [
            "alarm",
            "cameras"
          ]
        },
        {
          "id": 1,
          "name": "A113 Transitional Housing",
          "city": "Santa Monica",
          "state": "CA",
          "photo": "https://angular.dev/assets/images/tutorials/common/brandon-griggs-wR11KBaB86U-unsplash.jpg",
          "availableUnits": 0,
          "wifi": false,
          "laundry": true,
          "coordinates": {
            "latitude": 34.0195,
            "longitude": -118.4912
          },
          "security": [
            "smoke detectors"
          ]
        },
        {
          "id": 2,
          "name": "Warm Beds Housing Support",
          "city": "Juneau",
          "state": "AK",
          "photo": "https://angular.dev/assets/images/tutorials/common/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
          "availableUnits": 1,
          "wifi": false,
          "laundry": false,
          "coordinates": {
            "latitude": 58.3019,
            "longitude": -134.4197
          },
          "securitySystem": [
            "reforced doors"
          ]
        },
        {
          "id": 3,
          "name": "Homesteady Housing",
          "city": "Chicago",
          "state": "IL",
          "photo": "https://angular.dev/assets/images/tutorials/common/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
          "availableUnits": 1,
          "wifi": true,
          "laundry": false,
          "coordinates": {
            "latitude": 41.8781,
            "longitude": -87.6298
          },
          "security": [
            "alarm",
            "cameras",
            "smoke detectors"
          ]
        },
        {
          "id": 4,
          "name": "Happy Homes Group",
          "city": "Gary",
          "state": "IN",
          "photo": "https://angular.dev/assets/images/tutorials/common/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
          "availableUnits": 1,
          "wifi": true,
          "laundry": false,
          "coordinates": {
            "latitude": 41.5934,
            "longitude": -87.3464
          },
          "security": [
            "alarm"
          ]
        },
        {
          "id": 5,
          "name": "Hopeful Apartment Group",
          "city": "Oakland",
          "state": "CA",
          "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
          "availableUnits": 2,
          "wifi": true,
          "laundry": true,
          "coordinates": {
            "latitude": 37.8044,
            "longitude": -122.2711
          },
          "security": [
            "cameras",
            "smoke detectors"
          ]
        },
        {
          "id": 6,
          "name": "Seriously Safe Towns",
          "city": "Oakland",
          "state": "CA",
          "photo": "https://angular.dev/assets/images/tutorials/common/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
          "availableUnits": 5,
          "wifi": true,
          "laundry": true,
          "coordinates": {
            "latitude": 37.8044,
            "longitude": -122.2711
          },
          "security": [
            "alarm",
            "smoke detectors"
          ]
        },
        {
          "id": 7,
          "name": "Hopeful Housing Solutions",
          "city": "Oakland",
          "state": "CA",
          "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-GGupkreKwxA-unsplash.jpg",
          "availableUnits": 2,
          "wifi": true,
          "laundry": true,
          "coordinates": {
            "latitude": 37.8044,
            "longitude": -122.2711
          },
          "security": [
            "alarm",
            "smoke detectors"
          ]
        },
        {
          "id": 8,
          "name": "Seriously Safe Towns",
          "city": "Oakland",
          "state": "CA",
          "photo": "https://angular.dev/assets/images/tutorials/common/saru-robert-9rP3mxf8qWI-unsplash.jpg",
          "availableUnits": 10,
          "wifi": false,
          "laundry": false,
          "coordinates": {
            "latitude": 37.8044,
            "longitude": -122.2711
          },
          "security": [
            "smoke detectors"
          ]
        },
        {
          "id": 9,
          "name": "Capital Safe Towns",
          "city": "Portland",
          "state": "OR",
          "photo": "https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg",
          "availableUnits": 6,
          "wifi": true,
          "laundry": true,
          "coordinates": {
            "latitude": 45.5152,
            "longitude": -122.6784
          },
          "security": [
            "alarm"
          ]
        }
      ]
    }
  ]

  newCasa = {
    name: '',
    city: '',
    state: '',
    photo: '',
    availableUnits: 0,
    wifi: false,
    laundry: false,
    security: ''
  };

  /* no funciona bien */
  applyForm: FormGroup;
  ngOnInit() {
    this.applyForm = new FormGroup({
      name: new FormControl(this.newCasa.name, Validators.required),
      city: new FormControl(this.newCasa.city, Validators.required),
      state: new FormControl(this.newCasa.state, Validators.required),
      photo: new FormControl(this.newCasa.photo),
      availableUnits: new FormControl(this.newCasa.availableUnits, [Validators.required, Validators.min(1)]),
      wifi: new FormControl(this.newCasa.wifi),
      laundry: new FormControl(this.newCasa.laundry),
      security: new FormControl(this.newCasa.security, Validators.required)
    });
  }
}


