import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Country } from '../../interfaces/country.interface';

@Component({
  standalone: true,
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {

  countries = input.required<Country[]>( );

}
