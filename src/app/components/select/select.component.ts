import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  selectedFood: Food;
  selectedValue: string;

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  constructor() { }

  ngOnInit() {
    this.selectedFood = this.foods[0];
  }

  onSelectionChange(event: any) {
    console.log(this.selectedFood);
  }

}

interface Food {
  value: string;
  viewValue: string;
}

