import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  standalone: true,
  selector: 'app-by-country-page',
  imports: [SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { }
