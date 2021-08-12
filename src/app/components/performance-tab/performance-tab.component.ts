import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { MatPaginator } from '@angular/material';
import { BaasData, PerformanceTable, UnitTestDetails, UnitTest } from 'src/app/model/shared.model';

@Component({
  selector: 'app-performance-tab',
  templateUrl: './performance-tab.component.html',
  styleUrls: ['./performance-tab.component.css']
})
export class PerformanceTabComponent implements OnInit {

  rowHeader: string; 
  localUnitTestArray: UnitTest[];
  baasDataArray: BaasData[];

  schoolPerfTable: PerformanceTable[] = [];
  selectedFacultyId: number;
  selectedSchoolId: number;

  displayedColumns: string[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.rowHeader= 'school';
    this.localUnitTestArray = this.sharedService.unitTestArray;
    this.baasDataArray = this.sharedService.baasDataArray;

    this.fillSchoolDataSource();  
    //this.fillFacultyDataSource(); 
    //this.fillGroupDataSource();   

  }

  prepareRowWithGivenData(id: number, name: string, grade: Map<number, UnitTestDetails>) : PerformanceTable{
    let firstItem: PerformanceTable = {
      id: id,
      name: name,
      grades: grade
    };
    return firstItem;
  }

  fillSchoolDataSource(): void{    

    // Prepare dummy row for ALL column    
    this.schoolPerfTable.push(this.prepareRowWithGivenData(null, 'ALL', new Map<number, UnitTestDetails>()));

    this.baasDataArray.forEach(element => {
      this.filterTheRawDataBasedOnPageLevel(element, element.schoolId, element.schoolName);
    });
    console.log(this.schoolPerfTable);
  }

  // filterTheRawDataBasedOnPageLevel(element: BaasData, id: number, name: string){

  //   let schoolItemIndex = this.schoolPerfTable.findIndex(perf => perf.id == id);
  //   if(schoolItemIndex >= 0){    

  //     if(this.schoolPerfTable[schoolItemIndex].grades.has(element.unitTestId)){

  //       let tempTestDetailObj = this.updateUnitTestDetailsObject(element, 
  //           this.schoolPerfTable[schoolItemIndex].grades.get(element.unitTestId));

  //       this.schoolPerfTable[schoolItemIndex].grades.set(element.unitTestId, tempTestDetailObj);
  //     }
  //     else{
  //       this.schoolPerfTable[schoolItemIndex].grades.set(element.unitTestId, this.prepareUnitTestDetailsObject(element));;
  //     }
  //   }
  //   else{      
      
  //     let gradeDetailList = new Map<number, UnitTestDetails>();
  //     gradeDetailList.set(element.unitTestId, this.prepareUnitTestDetailsObject(element));

  //     let item = this.prepareRowWithGivenData(id, name, gradeDetailList);
  //     this.schoolPerfTable.push(item);
  //   }

  //   if(this.schoolPerfTable[0].grades.has(element.unitTestId)){
  //     let testDetail = this.updateUnitTestDetailsObject(element, this.schoolPerfTable[0].grades.get(element.unitTestId));
  //     this.schoolPerfTable[0].grades.set(element.unitTestId, testDetail);
  //   }
  //   else{
  //     this.schoolPerfTable[0].grades.set(element.unitTestId, this.prepareUnitTestDetailsObject(element));
  //   }
  // }

  filterTheRawDataBasedOnPageLevel(element: BaasData, id: number, name: string){

    let schoolItemIndex = this.schoolPerfTable.findIndex(perf => perf.id == id);

    if(schoolItemIndex > 0){  

      // If element is found then schoolItemIndex is always > 0 because first element in this.schoolPerfTable array has id as null
      this.updateUnitTestDataInTable(element, schoolItemIndex);
    }
    else if(schoolItemIndex == -1){   
      // Not Found case
      let gradeDetailList = new Map<number, UnitTestDetails>();
      gradeDetailList.set(element.unitTestId, this.prepareUnitTestDetailsObject(element));

      let item = this.prepareRowWithGivenData(id, name, gradeDetailList);
      this.schoolPerfTable.push(item);
    }

    this.updateUnitTestDataInTable(element, 0);
  }

  updateUnitTestDataInTable(element: BaasData, index: number){

    if(this.schoolPerfTable[index].grades.has(element.unitTestId)){
      let testDetail = this.updateUnitTestDetailsObject(element, this.schoolPerfTable[index].grades.get(element.unitTestId));
      this.schoolPerfTable[index].grades.set(element.unitTestId, testDetail);
    }
    else{
      this.schoolPerfTable[index].grades.set(element.unitTestId, this.prepareUnitTestDetailsObject(element));
    }
  }


  prepareUnitTestDetailsObject(element : BaasData) : UnitTestDetails{

    let unitTestDetail: UnitTestDetails = {
      totalStudents: element.totalStudents,
      totalStudentsAttempted: element.totalStudentsAttempted,
      totalQuestions: element.totalQuestions,
      totalCorrectedQuestions: element.totalCorrectedQuestions,
      score: (element.totalCorrectedQuestions / element.totalQuestions) * 100
    };
    return unitTestDetail;
  }

  updateUnitTestDetailsObject(element : BaasData, testDetailObject: UnitTestDetails) : UnitTestDetails{

    testDetailObject.totalStudents = testDetailObject.totalStudents + element.totalStudents;
    testDetailObject.totalStudentsAttempted = testDetailObject.totalStudentsAttempted + element.totalStudentsAttempted;
    testDetailObject.totalCorrectedQuestions = testDetailObject.totalCorrectedQuestions + element.totalCorrectedQuestions;
    testDetailObject.totalQuestions = testDetailObject.totalQuestions + element.totalQuestions;
    testDetailObject.score = (testDetailObject.totalCorrectedQuestions / testDetailObject.totalQuestions) * 100;

    return testDetailObject;
  }

  fillGroupDataSource(): void{    

    // Prepare dummy row for ALL column
    this.schoolPerfTable.push(this.prepareRowWithGivenData(null, 'ALL', new Map<number, UnitTestDetails>()));

    this.selectedSchoolId = 19421;
    this.selectedFacultyId = 22423;
    let groupDataArray: BaasData[] = this.baasDataArray.filter(data => 
      data.schoolId == this.selectedSchoolId && data.leadFacultyId == this.selectedFacultyId);

    groupDataArray.forEach(element => {
      this.filterTheRawDataBasedOnPageLevel(element, element.groupId, element.groupName);
    });
    console.log(this.schoolPerfTable);
  }

  fillFacultyDataSource(): void{    

    // Prepare dummy row for ALL column
    this.schoolPerfTable.push(this.prepareRowWithGivenData(null, 'ALL', new Map<number, UnitTestDetails>()));

    this.selectedSchoolId = 19421;
    let facultyDataArray: BaasData[] = this.baasDataArray.filter(data => data.schoolId == this.selectedSchoolId);
    
    facultyDataArray.forEach(element => {
      this.filterTheRawDataBasedOnPageLevel(element, element.leadFacultyId, element.leadFacultyName);
    });
    console.log(this.schoolPerfTable);
  }

}
