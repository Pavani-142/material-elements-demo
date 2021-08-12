import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClassComponent } from '../class/class.component';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){

    const dialogData = {
      title: 'Edit Class',
      leadFacultyName: 'Faculty 1',
      bellPeriod: '3'
    };

    let dialogRef = this.matDialog.open(ClassComponent, { width: '30%', height: '40%', data: dialogData, backdropClass: 'backdropBackground'});
    //let dialogRef = this.matDialog.open(ClassComponent, { width: '50%', data: dialogData, panelClass: 'custom-dialog-container'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
