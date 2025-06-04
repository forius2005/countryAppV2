import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-Found.component.html',
})
export class NotFoundComponent {

  location = inject(Location);

  goBack(): void {
    this.location.back();
  }

}
