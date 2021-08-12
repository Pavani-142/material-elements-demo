export interface UnitTest{
    id: number;
    name: string;
    assignmentId: number;
    // groupId: number;
}

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
    grades: Map<number, UnitTestDetails>;
}

export interface UnitTestDetails{
    score: number;
    totalQuestions: number;
    totalCorrectedQuestions: number;
    totalStudents: number;
    totalStudentsAttempted: number;
    //assignmentId: number; 
}
