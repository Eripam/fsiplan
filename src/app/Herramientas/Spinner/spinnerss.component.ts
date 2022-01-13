import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="overlay" *ngIf="isLoadingSS$|async">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div>PRUEBA</div>
    </div>
  </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerSSComponent implements OnInit {
  isLoadingSS$=this.SpinnerSSService.isLoadingSS$;

  constructor(private SpinnerSSService: SpinnerService) {}

  ngOnInit(): void {}
}
