import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-demo',
  templateUrl: './image-demo.component.html',
  styleUrls: ['./image-demo.component.css']
})
export class ImageDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onMouseClick(event){
    console.log(event);
    var myElement = document.getElementById('element_within_div');
    var topPos = myElement.offsetTop;
    console.log(topPos);

    //console.log(document.getElementById('scrolling_div').scrollTop);

    var highlighted = document.getElementById('element_in_p');
    //console.log(highlighted.offsetTop);
    console.log(highlighted.offsetTop - topPos);

    var highlighted = document.getElementById('element_in_p2');
    //console.log(highlighted.offsetTop);
    console.log(highlighted.offsetTop - topPos);
  }

}
