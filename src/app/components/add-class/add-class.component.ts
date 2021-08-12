import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClassComponent } from '../class/class.component';
import { NewAddClassComponent } from '../new-add-class/new-add-class.component';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){

    const dialogData = {
      title: 'Add Class',
    };

    // let dialogRef = this.matDialog.open(ClassComponent,
    //               { 
    //                 width: '35vw', height: '45vh', maxWidth: '35vw',
    //                 data: dialogData,
    //                 backdropClass: 'backdropBackground',
    //                 autoFocus: false
    //               });

    // let dialogRef = this.matDialog.open(NewAddClassComponent,
    //   { 
    //     width: '35vw', height: '45vh', maxWidth: '400px',
    //     minWidth: '320px',
    //     data: dialogData,
    //     backdropClass: 'backdropBackground',
    //     autoFocus: false
    //   });

    let dialogRef = this.matDialog.open(NewAddClassComponent,
      { 
        width: '35vw', 
        // height: '45vh',
        //height: '33%', 
        maxWidth: '400px',
        minWidth: '320px',
        maxHeight: '450px',
        //minHeight: '300px',
        data: dialogData,
        backdropClass: 'backdropBackground',
        autoFocus: false
      });


    //let dialogRef = this.matDialog.open(ClassComponent, { width: '50%', data: dialogData, panelClass: 'custom-dialog-container'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
