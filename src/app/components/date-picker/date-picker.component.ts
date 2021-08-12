import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  minDate = new Date();
  maxDate = new Date(2020,7,20);

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6;
  }

}
