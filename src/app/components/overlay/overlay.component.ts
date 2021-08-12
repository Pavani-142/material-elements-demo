import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  OpenDialog(isOpen: boolean){
    this.isOpen = isOpen;
    console.log(this.isOpen);
  }

  public positions = [
    new ConnectionPositionPair({
        originX: 'center',
        originY: 'bottom'},{
        overlayX: 'center',
        overlayY: 'top'},
         0,
         10)
    
];

}
