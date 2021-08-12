import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Faculty{
  id: number;
  name: string;
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  // add this component to entry component

  classForm: FormGroup;
  facultyList: Faculty[]=[{
    id:1,
    name:'Faculty 1',
  },{
    id:2,
    name:'Faculty 2',
  },{
    id:3,
    name:'Faculty 3',
  }];
  //alphaNumericRegex = '^[A-Za-z0-9]+';
  alphaNumericRegex ='^[A-Za-z0-9]+$';
  bellPeriod: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    this.bellPeriod = this.data.bellPeriod;
    
    this.classForm = new FormGroup({
      facultyName: new FormControl(this.data.leadFacultyName, { validators: [Validators.required] }),
      bellPeriod: new FormControl(this.data.bellPeriod, { validators: [Validators.required,
        Validators.minLength(1), 
        Validators.maxLength(20),
        Validators.pattern(this.alphaNumericRegex)] })
    });

    // console.log(this.data.leadFacultyName);
    // console.log(this.data.bellPeriod);
  }

  disabled: boolean;

  disableButton(event): void{

   
    console.log('Disable button called');
    let x = event.target.value != this.bellPeriod;
    console.log(' Previous value: ' + this.bellPeriod + " New value " + this.classForm.controls['bellPeriod'].value);
    console.log('Disable button stopped');

    if(x)
    { 
      this.disabled = true;
    }
    else
    {
      this.disabled = false;
    }
   // return x;
  }

  selectionChange(event):void{
    console.log('selection change is called' + event.source.value);
    let x = event.source.value != this.data.leadFacultyName;
    if(x)
    { 
      this.disabled = false;
    }
    else
    {
      this.disabled = true;
    }
  }
  
  cancel(){

  }

  save(){

    try{

      throw "Error occured";
      console.log('save method is called');
      if(this.classForm.valid){
        var name = this.classForm.controls['facultyName'].value;
        var bellNumber = this.classForm.controls['bellPeriod'].value;

        console.log(name);
        console.log(bellNumber);
      }
    }
    catch(error){
      console.log(error);
    }
  }
}
