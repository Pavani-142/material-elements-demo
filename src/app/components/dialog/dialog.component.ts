import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){

    let dialogRef = this.matDialog.open(DialogExampleComponent, {
      width: '90vw', height: '90vh', maxWidth: '90vw',
      // width: '35vw', height: '45vh', maxWidth: '35vw',
      data: {name: 'Pinky'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
