import { Injectable } from '@angular/core';
import { BaasData, UnitTest } from '../model/shared.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  unitTestArray: UnitTest[] = [
    {id: 1, name: 'Unit 1', assignmentId: 991},
    {id: 2, name: 'Unit 2', assignmentId: 992},
    {id: 3, name: 'Unit 3', assignmentId: null}
  ];
  
  baasDataArray: BaasData[] = [
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
     leadFacultyId: 22423, leadFacultyName: 'Test4', assignmentId: 992, totalCorrectedQuestions: 50, 
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

  constructor() { }

}
