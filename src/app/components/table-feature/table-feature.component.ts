import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PerformanceTable, UnitTest } from 'src/app/model/shared.model';
import { SharedService } from 'src/app/service/shared.service';
import { CdkTableModule } from '@angular/cdk/table'

@Component({
  selector: 'app-table-feature',
  templateUrl: './table-feature.component.html',
  styleUrls: ['./table-feature.component.css']
})
export class TableFeatureComponent implements OnInit, AfterViewInit {

  @Input() rowHeader: string;
  @Input() selectedFacultyId: number;
  @Input() selectedSchoolId: number;
  @Input() unitTestArray: UnitTest[];
  @Input() tableData: PerformanceTable[];

  displayedColumns: string[];
  dataSource = new MatTableDataSource<PerformanceTable>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // columns = [];
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(){

    // 1st WAY
    let unitTestIds: string[] = this.unitTestArray.map(u => { return 'UT' + u.id.toString()});
    
    this.displayedColumns  = [this.rowHeader];
    //this.displayedColumns.push("average");
    this.displayedColumns = this.displayedColumns.concat(unitTestIds);
    this.displayedColumns.push("action");

    // 2nd WAY
    // this.columns = [
    //   { columnDef: this.rowHeader, header: this.rowHeader, cell: (element: any) => `${element.name}`, isSticky: true },
    // ];

    // this.unitTestArray.forEach(unitTest => {

    //   let columnData = {
    //     columnDef: 'UT'+ unitTest.id,
    //     header: unitTest.name, 
    //     cell: (element: any) => `${ element.grades.has(unitTest.id) == true ? element.grades.get(unitTest.id).score : '-'}`,
    //     isExtraDataPresent: true
    //   }
    //   this.columns.push(columnData);
    // });

    // this.displayedColumns = this.columns.map(c => c.columnDef);
    // this.displayedColumns.push("action");
    
    console.log('displayedColumns ' + this.displayedColumns);

    this.dataSource.data = this.tableData;
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  viewFaculty(element){
    console.log(element);
  }

}
