import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface BaasData {
  groupId: number;
  groupName: string;
  schoolId: number;
  schoolName: string;
  leadFacultyName: string;
  leadFacultyId: number;
  totalQuestions: number;
  totalCorrectedQuestions: number;
  totalStudents: number;
  totalStudentsAttempted: number;
  unitTestId: number;
  assignmentId: number; 
}

export interface PerformanceTable{
  id: number;
  name: string;
  grades: Map<number, TestClass>;
}

export interface TestClass{
  score: number;
  totalQuestions: number;
  totalCorrectedQuestions: number;
  totalStudents: number;
  totalStudentsAttempted: number;
  //assignmentId: number; 
}

export interface UnitTest{
  id: number;
  name: string;
  assignmentId: number;
  // groupId: number;
}

const unitTestArray: UnitTest[] = [
  {id: 1, name: 'Unit 1', assignmentId: 991},
  {id: 2, name: 'Unit 2', assignmentId: 992},
  {id: 3, name: 'Unit 3', assignmentId: null}
];

const baasDataArray: BaasData[] = [
  {groupId: 1, groupName: 'Calc-BC-Test-1', schoolId: 19420, schoolName: 'Estacado School 1', 
   leadFacultyId: 22420, leadFacultyName: 'Test1', assignmentId: 991, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 1},

   {groupId: 2, groupName: 'Calc-BC-Test-2', schoolId: 19420, schoolName: 'Estacado School 1', 
   leadFacultyId: 22421, leadFacultyName: 'Test2', assignmentId: 992, totalCorrectedQuestions: 40, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2},

   {groupId: 3, groupName: 'Calc-BC-Test-3', schoolId: 19420, schoolName: 'Estacado School 1', 
   leadFacultyId: 22422, leadFacultyName: 'Test3', assignmentId: 992, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2},

   {groupId: 4, groupName: 'Calc-BC-Test-4', schoolId: 19421, schoolName: 'Estacado School 2', 
   leadFacultyId: 22423, leadFacultyName: 'Test4', assignmentId: 991, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 1},

   {groupId: 5, groupName: 'Calc-BC-Test-5', schoolId: 19421, schoolName: 'Estacado School 2', 
   leadFacultyId: 22424, leadFacultyName: 'Test5', assignmentId: 992, totalCorrectedQuestions: 40, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2},
   
   {groupId: 6, groupName: 'Calc-BC-Test-6', schoolId: 19421, schoolName: 'Estacado School 2', 
   leadFacultyId: 22425, leadFacultyName: 'Test6', assignmentId: 992, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2},
   
   {groupId: 7, groupName: 'Calc-BC-Test-7', schoolId: 19422, schoolName: 'Estacado School 3', 
   leadFacultyId: 22426, leadFacultyName: 'Test7', assignmentId: 991, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 1},

   {groupId: 8, groupName: 'Calc-BC-Test-8', schoolId: 19422, schoolName: 'Estacado School 3', 
   leadFacultyId: 22427, leadFacultyName: 'Test8', assignmentId: 992, totalCorrectedQuestions: 40, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2},
   
   {groupId: 9, groupName: 'Calc-BC-Test-9', schoolId: 19422, schoolName: 'Estacado School 3', 
   leadFacultyId: 22428, leadFacultyName: 'Test9', assignmentId: 992, totalCorrectedQuestions: 50, 
   totalQuestions: 60, totalStudents: 300, totalStudentsAttempted: 245, unitTestId: 2}
];

@Component({
  selector: 'app-dynamic-school-table',
  templateUrl: './dynamic-school-table.component.html',
  styleUrls: ['./dynamic-school-table.component.css']
})
export class DynamicSchoolTableComponent implements OnInit, AfterViewInit {

  route: number;
  rowHeader: string;
  selectedFacultyId: number;
  selectedSchoolId: number;
  //unitTests: Map<number, UnitTest>;
  localUnitTestArray: UnitTest[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<PerformanceTable>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    // this.unitTests = new Map<number, UnitTest>();
    this.localUnitTestArray = unitTestArray;

    this.route = 3;

    if(this.route == 1){
      this.rowHeader= 'school';
      this.fillDataSourceObject2();  
    }
    else if(this.route == 2){
      this.rowHeader= 'faculty';
    }
    else{
      this.rowHeader= 'class';
      this.fillDataSourceObject3();
    }

    // unitTestArray.forEach(x => {
    //   if(this.unitTests.has(x.id)){

    //   }
    //   else{
    //     this.unitTests.set(x.id, x);
    //   }
    // });

    //this.displayedColumns  = [this.rowHeader].concat(Array.from(this.unitTests.values()).map(unitTest => 'UT' + unitTest.id.toString()));
    //this.displayedColumns  = [this.rowHeader].concat(Array.from(this.unitTests.values()).map(unitTest => 'UT' + unitTest.id.toString()));

    let unitTestIds: string[] = unitTestArray.map(u => { return 'UT' + u.id.toString()});
    this.displayedColumns  = [this.rowHeader].concat(unitTestIds);

    this.displayedColumns.push("action");
    
    console.log('displayedColumns ' + this.displayedColumns);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // fillDataSourceObject1(): void{
  //   this.dataSource = new MatTableDataSource<PerformanceTable>();

  //   for(let i=1; i< 11; i++){

  //     let gradeList = new Map<number, UnitTestGrades>();

  //     for(let j=1; j< 11; j++){

  //       let name: string = 'Unit ' + j;
  //       let unitTestGrade: UnitTestGrades = {
  //         id: j,
  //         name: name,
  //         score: Math.floor(Math.random() * 100) + 1  
  //       };

  //       gradeList.set(j, unitTestGrade);

  //       if(this.unitTests.has(j)){
  //         // do nothing
  //       }
  //       else{

  //         let unitTest: UnitTest = {
  //           id: j,
  //           name: name
  //         };

  //         this.unitTests.set(j, unitTest);
  //       }
  //     }
      
  //     let item: PerformanceTable = {
  //       schoolId: 123,
  //       schoolName: 'AP Coronado High school ' + i,
  //       grades: gradeList
  //     };

  //     this.dataSource.data.push(item);

  //   }

  //   console.log(this.dataSource.data);
  // }


  fillDataSourceObject2(): void{
    this.dataSource = new MatTableDataSource<PerformanceTable>();
    let schoolPerfTable: PerformanceTable[] = [];

    let schoolsList: Map<number, string> = new Map<number, string>();
    //let gradeList: Map<number, TestClass> = new Map<number, TestClass>();

    // dummy row for ALL column

    let firstItem: PerformanceTable = {
      id: null,
      name: 'ALL',
      grades: new Map<number, TestClass>()
    };
    schoolPerfTable.push(firstItem);

    baasDataArray.forEach(element => {

      if(schoolsList.has(element.schoolId)){

        let schoolItemIndex = schoolPerfTable.findIndex(perf => perf.id == element.schoolId);

        if(schoolPerfTable[schoolItemIndex].grades.has(element.unitTestId)){

          let tempTestClass: TestClass = schoolPerfTable[schoolItemIndex].grades.get(element.unitTestId);

          tempTestClass.totalCorrectedQuestions = tempTestClass.totalCorrectedQuestions + element.totalCorrectedQuestions;
          tempTestClass.totalQuestions = tempTestClass.totalQuestions + element.totalQuestions;
          tempTestClass.totalStudents = tempTestClass.totalStudents + element.totalStudents;
          tempTestClass.totalStudentsAttempted = tempTestClass.totalStudentsAttempted + element.totalStudentsAttempted;
          tempTestClass.score = (tempTestClass.totalCorrectedQuestions / tempTestClass.totalQuestions)*100;

          // schoolPerfTable[schoolItemIndex].grades[element.unitTestId] = tempTestClass;
          schoolPerfTable[schoolItemIndex].grades.set(element.unitTestId, tempTestClass);
        }
        else{
          let tempTest: TestClass = {
            //assignmentId: element.assignmentId,
            totalStudents: element.totalStudents,
            totalStudentsAttempted: element.totalStudentsAttempted,
            totalQuestions: element.totalQuestions,
            totalCorrectedQuestions: element.totalCorrectedQuestions,
            score: (element.totalCorrectedQuestions/element.totalQuestions)*100
          };
          // let gradeList1: Map<number, TestClass> = new Map<number, TestClass>();
          // gradeList1.set(element.unitTestId, tempTest);

          schoolPerfTable[schoolItemIndex].grades.set(element.unitTestId, tempTest);;
        }
      }
      else{
        schoolsList.set(element.schoolId, element.schoolName);

        let testClass: TestClass = {
          //assignmentId: element.assignmentId,
          totalStudents: element.totalStudents,
          totalStudentsAttempted: element.totalStudentsAttempted,
          totalQuestions: element.totalQuestions,
          totalCorrectedQuestions: element.totalCorrectedQuestions,
          score: (element.totalCorrectedQuestions/element.totalQuestions)*100
        };
        let gradeList2: Map<number, TestClass> = new Map<number, TestClass>();
        gradeList2.set(element.unitTestId, testClass);
        //gradeList.set(element.unitTestId, testClass);

        let item: PerformanceTable = {
          id: element.schoolId,
          name: element.schoolName,
          grades: gradeList2
        };

        schoolPerfTable.push(item);
      }

      if(schoolPerfTable[0].grades.has(element.unitTestId)){
        let tempTestClass: TestClass = schoolPerfTable[0].grades.get(element.unitTestId);

        tempTestClass.totalCorrectedQuestions = tempTestClass.totalCorrectedQuestions + element.totalCorrectedQuestions;
        tempTestClass.totalQuestions = tempTestClass.totalQuestions + element.totalQuestions;
        tempTestClass.totalStudents = tempTestClass.totalStudents + element.totalStudents;
        tempTestClass.totalStudentsAttempted = tempTestClass.totalStudentsAttempted + element.totalStudentsAttempted;
        tempTestClass.score = (tempTestClass.totalCorrectedQuestions / tempTestClass.totalQuestions)*100;

        // schoolPerfTable[0].grades[element.unitTestId] = tempTestClass;
        schoolPerfTable[0].grades.set(element.unitTestId, tempTestClass);
      }
      else{

        let tempTestOne: TestClass = {
          totalStudents: element.totalStudents,
          totalStudentsAttempted: element.totalStudentsAttempted,
          totalQuestions: element.totalQuestions,
          totalCorrectedQuestions: element.totalCorrectedQuestions,
          score: (element.totalCorrectedQuestions / element.totalQuestions) * 100
        };

        schoolPerfTable[0].grades.set(element.unitTestId, tempTestOne);
      }
    });

    this.dataSource.data = schoolPerfTable;

    console.log(this.dataSource.data);
  }

  
  fillDataSourceObject3(): void{

    this.selectedSchoolId = 19421;

    this.dataSource = new MatTableDataSource<PerformanceTable>();
    let classPerfTable: PerformanceTable[] = [];

    let groupsList: Map<number, string> = new Map<number, string>();
    //let gradeList: Map<number, TestClass> = new Map<number, TestClass>();

    // filter baasdataarray aith only selected school id
    let dataArrayPerSchool = baasDataArray.filter(data => data.schoolId == this.selectedSchoolId);

    let firstItem: PerformanceTable = {
      id: null,
      name: 'ALL',
      grades: new Map<number, TestClass>()
    };
    classPerfTable.push(firstItem);

    dataArrayPerSchool.forEach(element => {

      if(groupsList.has(element.groupId)){

        let schoolItemIndex = classPerfTable.findIndex(perf => perf.id == element.schoolId);

        if(classPerfTable[schoolItemIndex].grades.has(element.unitTestId)){

          let tempTestClass: TestClass = classPerfTable[schoolItemIndex].grades.get(element.unitTestId);

          tempTestClass.totalCorrectedQuestions = tempTestClass.totalCorrectedQuestions + element.totalCorrectedQuestions;
          tempTestClass.totalQuestions = tempTestClass.totalQuestions + element.totalQuestions;
          tempTestClass.totalStudents = tempTestClass.totalStudents + element.totalStudents;
          tempTestClass.totalStudentsAttempted = tempTestClass.totalStudentsAttempted + element.totalStudentsAttempted;
          tempTestClass.score = (tempTestClass.totalCorrectedQuestions / tempTestClass.totalQuestions) * 100;

          classPerfTable[schoolItemIndex].grades[element.unitTestId] = tempTestClass;
        }
        else{
          let tempTest: TestClass = {
            //assignmentId: element.assignmentId,
            totalStudents: element.totalStudents,
            totalStudentsAttempted: element.totalStudentsAttempted,
            totalQuestions: element.totalQuestions,
            totalCorrectedQuestions: element.totalCorrectedQuestions,
            score: (element.totalCorrectedQuestions/element.totalQuestions) * 100
          };

          classPerfTable[schoolItemIndex].grades.set(element.unitTestId, tempTest);;
        }
      }
      else{
        groupsList.set(element.groupId, element.groupName);

        let testClass: TestClass = {
          //assignmentId: element.assignmentId,
          totalStudents: element.totalStudents,
          totalStudentsAttempted: element.totalStudentsAttempted,
          totalQuestions: element.totalQuestions,
          totalCorrectedQuestions: element.totalCorrectedQuestions,
          score: (element.totalCorrectedQuestions/element.totalQuestions) * 100
        };
        let gradeList2: Map<number, TestClass> = new Map<number, TestClass>();
        gradeList2.set(element.unitTestId, testClass);
        //gradeList.set(element.unitTestId, testClass);

        let item: PerformanceTable = {
          id: element.groupId,
          name: element.groupName,
          grades: gradeList2
        };

        classPerfTable.push(item);
      }

      if(classPerfTable[0].grades.has(element.unitTestId)){
        let tempTestClass: TestClass = classPerfTable[0].grades.get(element.unitTestId);

        tempTestClass.totalCorrectedQuestions = tempTestClass.totalCorrectedQuestions + element.totalCorrectedQuestions;
        tempTestClass.totalQuestions = tempTestClass.totalQuestions + element.totalQuestions;
        tempTestClass.totalStudents = tempTestClass.totalStudents + element.totalStudents;
        tempTestClass.totalStudentsAttempted = tempTestClass.totalStudentsAttempted + element.totalStudentsAttempted;
        tempTestClass.score = (tempTestClass.totalCorrectedQuestions / tempTestClass.totalQuestions)*100;

        // schoolPerfTable[0].grades[element.unitTestId] = tempTestClass;
        classPerfTable[0].grades.set(element.unitTestId, tempTestClass);
      }
      else{

        let tempTestOne: TestClass = {
          totalStudents: element.totalStudents,
          totalStudentsAttempted: element.totalStudentsAttempted,
          totalQuestions: element.totalQuestions,
          totalCorrectedQuestions: element.totalCorrectedQuestions,
          score: (element.totalCorrectedQuestions / element.totalQuestions) * 100
        };

        classPerfTable[0].grades.set(element.unitTestId, tempTestOne);
      }
    });
    

    this.dataSource.data = classPerfTable;

    console.log(this.dataSource.data);
  }

  getAveragePercentage() : number{
    return 55;
  }

}
