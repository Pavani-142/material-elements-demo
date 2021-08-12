import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit() {
  }

  logChange(index){
    console.log(index);
  }

}
