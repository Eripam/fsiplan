import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class CompletoComponent implements OnInit {
  sideBarOpen=false;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }

}
