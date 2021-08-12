import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  hello;

  constructor() { }

  ngOnInit() {
    this.hello = {
      name: 'hi',
      isFound: true
    };

    console.log(this.hello.isFound);
    console.log(this.hello);

  }

}

export interface example{
  name: string;
  isFound: boolean;
}
