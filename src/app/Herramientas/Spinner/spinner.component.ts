import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="overlay" *ngIf="isLoading$|async">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div><div class="overlay" *ngIf="isLoadingSS$|async">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div>PRUEBA</div>
    </div>
  </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading$=this.SpinnerService.isLoading$;
  isLoadingSS$=this.SpinnerService.isLoadingSS$;

  constructor(private SpinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
