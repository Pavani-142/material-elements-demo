import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface PerformanceTable {
  schoolId: number;
  schoolName: string;
  grades: Map<number, UnitTestGrades>;
}

export interface UnitTestGrades{
  id: number;
  name: string;
  score: number;
}

export interface UnitTest{
  id: number;
  name: string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {school: 'AP Coronado High school', position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', H1: 'a'},
//   {school: 'AP QA High school', position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', H1: 'b'},
//   {school: 'Quick High school', position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', H1: 'c'},
//   {school: 'Estacado High school', position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', H1: 'd'},
//   {school: 'Lubbock High school', position: 5, name: 'Boron', weight: 10.811, symbol: 'B', H1: 'e'},
//   {school: 'Telangana High school', position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', H1: 'f'},
//   {school: 'Andhra High school', position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', H1: 'g'},
//   {school: 'Govt High school', position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', H1: 'h'},
//   {school: 'Vijayawada High school', position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', H1: 'j'},
//   {school: 'Guntur High school', position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', H1: 'i'}
// ];


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // displayedColumns = ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
  rowHeader = 'school';
  unitTests: Map<number, UnitTest>;
  //unitTests = new Map<number, PeriodicElement>();

  displayedColumns: string[];
  dataSource: MatTableDataSource<PerformanceTable>;

  constructor() { }

  ngOnInit() {
    this.unitTests = new Map<number, UnitTestGrades>();
    this.fillDataSourceObject1();    
    //this.fillDataSourceObject2();  

    this.displayedColumns  = [this.rowHeader].concat(Array.from(this.unitTests.values()).map(unitTest => 'UT' + unitTest.id.toString()));
    this.displayedColumns.push("action");
    
    console.log('displayedColumns' + this.displayedColumns);
    
    // this.dataSource = ELEMENT_DATA;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fillDataSourceObject1(): void{
    this.dataSource = new MatTableDataSource<PerformanceTable>();

    for(let i=1; i< 11; i++){

      let gradeList = new Map<number, UnitTestGrades>();

      for(let j=1; j< 11; j++){

        let name: string = 'Unit ' + j;
        let unitTestGrade: UnitTestGrades = {
          id: j,
          name: name,
          score: Math.floor(Math.random() * 100) + 1  
        };

        gradeList.set(j, unitTestGrade);

        if(this.unitTests.has(j)){
          // do nothing
        }
        else{

          let unitTest: UnitTest = {
            id: j,
            name: name
          };

          this.unitTests.set(j, unitTest);
        }
      }
      
      let item: PerformanceTable = {
        schoolId: 123,
        schoolName: 'AP Coronado High school ' + i,
        grades: gradeList
      };

      this.dataSource.data.push(item);

    }

    console.log(this.dataSource.data);
  }


  fillDataSourceObject2(): void{
    this.dataSource = new MatTableDataSource<PerformanceTable>();

    let dummyItem: PerformanceTable = {
      schoolId: 123,
      schoolName: 'All',
      grades: new Map<number, UnitTestGrades>()
    };
    this.dataSource.data.push(dummyItem);
    for(let i=1; i< 6; i++){

      let gradeList = new Map<number, UnitTestGrades>();

      for(let j=1; j< 6; j++){
        
        let name: string = 'Unit ' + j;

        let unitTestGrade: UnitTestGrades = {
          id: j,
          name: name,
          score: Math.floor(Math.random() * 100) + 1  
        };

        gradeList.set(j, unitTestGrade);

        if(this.unitTests.has(j)){
          // do nothing
        }
        else{

          let unitTest: UnitTest = {
            id: j,
            name: name
          };

          this.unitTests.set(j, unitTest);
        }
      }
      
      let item: PerformanceTable = {
        schoolId: 123,
        schoolName: 'AP Coronado High school ' + i,
        grades: gradeList
      };

      this.dataSource.data.push(item);

    }

    console.log(this.dataSource.data);
  }

  getAveragePercentage() : number{
    return 55;
  }

}
