import { Component, OnInit } from '@angular/core';

export class SchoolInfo{
  schoolId: number;
  schoolName: string;
  noOfclasses: number;
  noOflicensesAssigned: number;
}

const schoolData: SchoolInfo[] = [
  {schoolId: 1, schoolName: 'Coronado High School', noOfclasses: 0, noOflicensesAssigned: 0},
  {schoolId: 4, schoolName: 'Lubbock High School', noOfclasses: 39, noOflicensesAssigned: 800},
  {schoolId: 3, schoolName: 'Montery High School', noOfclasses: 44, noOflicensesAssigned: 1050},
  {schoolId: 2, schoolName: 'Estacado High School', noOfclasses: 41, noOflicensesAssigned: 731}
];

@Component({
  selector: 'app-list-of-schools',
  templateUrl: './list-of-schools.component.html',
  styleUrls: ['./list-of-schools.component.css']
})
export class ListOfSchoolsComponent implements OnInit {

  columnNames: string[] = ['school', 'classes', 'licensesAssigned', 'action'];
  dataSource = schoolData;

  constructor() { }

  ngOnInit() {
  }

  ViewSchool(id: number){

  }

  applyFilter(){
    
  }

}
