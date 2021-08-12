import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message, action){

    let snackbarRef = this.snackBar.open(message, action, {duration: 2000});
    
    snackbarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });

    snackbarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered');
    });

  }

  openCustomSnackBar(){
    this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 2000});
  }

}

@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: orange'> Custom Snackbar </span>`
})
export class CustomSnackBarComponent{

}
