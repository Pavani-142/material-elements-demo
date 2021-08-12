import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { MatTooltip } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() minValue: number;
  @Input() maxValue: number;
  @Output() onSelectedValue: EventEmitter<number>;

  onlyNumbers: RegExp = new RegExp('^[0-9]$');

  // textPattern: string = '^([4-9]([0-9]{1}([ ]Mins)*)*)$';
  textPattern: string;
  
  testingDurationControl: FormControl;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.setRegex();
    // this.testingDurationControl = new FormControl('', [Validators.max(90),
    //   Validators.pattern(this.textPattern)]);

    // this.testingDurationControl = new FormControl(this.minValue + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING, [Validators.max(90),
    //   Validators.pattern(this.textPattern), this.appendAutoCompleteWordAtTheEnd(this.filteredOptions)]);

    // this.testingDurationControl = new FormControl(this.minValue + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING, 
    //   [Validators.pattern(this.textPattern)]);

    this.fillOptions();

    // this.testingDurationControl = new FormControl('',[Validators.max(90),
    //   Validators.pattern(this.textPattern)]);
    
    // this.testingDurationControl = new FormControl(this.minValue + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING, [Validators.max(90),
    //   Validators.pattern(this.textPattern)]);

    this.testingDurationControl = new FormControl(this.minValue + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING, [Validators.max(90),
    this.autocompleteStringValidator(this.options)]);

    this.filteredOptions = this.testingDurationControl.valueChanges.pipe(
      startWith(''),      
      map(value => this._filter(value))
    );

    // this.filteredOptions = this.testingDurationControl.valueChanges.pipe(
    //   startWith(this.minValue + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING),      
    //   map(value => this._filter(value))
    // );

 
  }

  fillOptions() {
    for(let i = this.minValue; i <= this.maxValue; i++){
      let option: string = i + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING;
      this.options.push(option);
    }
  }

  private _filter(value: string): string[] {

    const filterValue = value.toString().replace(/\s+/g, '').toLocaleLowerCase();
    return this.options.filter(option => option.replace(/\s+/g, '').toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  // uncomment this and comment below one
  // setRegex(){

  //   let minValueFirstDigit: number = 9;
  //   let minValueFirstDigitPlusOne: number = minValueFirstDigit > 8 ? 9: minValueFirstDigit + 1;

  //   // assume it will always be less than 9
  //   let minValueSecondDigit: number = 5;

  //   // this.textPattern = '^((4[5-9]?|[5-9]([0-9]?)[ ]?(M)?(i)?(n)?(s)?)*)$';

  //   if(minValueFirstDigitPlusOne < 9){
  //     this.textPattern = '^((' +minValueFirstDigit+ '['+minValueSecondDigit+'-9]?|['+minValueFirstDigitPlusOne+'-9]([0-9]?)[ ]?(M)?(i)?(n)?(s)?)*)$';
  //   }
  //   else{
  //     this.textPattern = '^((' +minValueFirstDigit+ '['+minValueSecondDigit+'-9]?[ ]?(M)?(i)?(n)?(s)?)*)$';
  //   }
  // }

  setRegex(){

    // this.textPattern = '^(4[5-9]?)|([5-9][0-9]?)[ ]?(M)?(i)?(n)?(s)?$';
    // this.textPattern = '^(4[5-9]?[ ]?(M)?(i)?(n)?(s)?)|([5-9][0-9]?[ ]?(M)?(i)?(n)?(s)?)$';
    //this.textPattern = '^(4[5-9]?[ ]?M?i?n?s?)$';
    this.textPattern = '^((4[5-9]?|[5-9]([0-9]?)[ ]?(M)?(i)?(n)?(s)?)*)$';
    
    // let minValueFirstDigit: number = 4;
    // let minValueFirstDigitPlusOne: number = minValueFirstDigit > 8 ? 9: minValueFirstDigit + 1;

    // // assume it will always be less than 9
    // let minValueSecondDigit: number = 5;

    // // this.textPattern = '^((4[5-9]?|[5-9]([0-9]?)[ ]?(M)?(i)?(n)?(s)?)*)$';
    // this.textPattern = '^((' +minValueFirstDigit+ '['+minValueSecondDigit+'-9]?|['+minValueFirstDigitPlusOne+'-9]([0-9]?)[ ]?(M)?(i)?(n)?(s)?)*)$';
  }
  
  getToolTipMessage(): string{
    // return this.testingDurationControl.hasError('required') ? AutoCompleteConstants.REQUIRED :
    let returnValue: string = this.testingDurationControl.hasError('max') ? AutoCompleteConstants.EXCEEDED_MAX_DURATION :
        this.testingDurationControl.hasError('pattern') ? 
        this.getErrorMessage(this.testingDurationControl.getError('pattern').actualValue) :        
        this.testingDurationControl.hasError('noOptionSelectedError') ? this.getErrorMessage(this.testingDurationControl.value)
        : AutoCompleteConstants.RECOMMENDED_DURATION;
    
    return returnValue;
  }

  checkIfValueisRecommendedDuration(): boolean{
    
    let value: string = this.testingDurationControl.value.trim();

    if(value.length >= 2){
      let firstTwoCharactersInString: string = value.substring(0,2);
      let testDurationInMinutes: number = Number(firstTwoCharactersInString);

      if(testDurationInMinutes == 45){
        return true;
      }
    }
    return false;
  }

  // getErrorMessage(value: string): string{

  //   let length = value.trim().length;
    
  //   if(length == 0){
  //     return AutoCompleteConstants.REQUIRED;
  //   }
  //   else if(length <= 2){
  //     let str: string = value.substring(0,length);
  //     let testDurationInMinutes: number = Number(str);

  //     if(!(isNaN(testDurationInMinutes)) && testDurationInMinutes < 45){
  //       return AutoCompleteConstants.LESS_THAN_MIN_DURATION;
  //     }
  //   }   

  //   return AutoCompleteConstants.INVALID_FORMAT;
  //   // return 'Only this format [XX Mins] is allowed';
  //   // return 'Please enter valid value. [XX Mins] is valid';
  // }

  getErrorMessage(value: string): string{

    let length = value.trim().length;
    
    if(length == 0){
      return AutoCompleteConstants.REQUIRED;
    }
    else{ // length >= 1 case
      let str: string = value.substring(0,length);
      let testDurationInMinutes: number = parseInt(str);

      //console.log(testDurationInMinutes);

      if(!(isNaN(testDurationInMinutes)) && testDurationInMinutes < 45){
        return AutoCompleteConstants.LESS_THAN_MIN_DURATION;
      }


      // testDurationInMinutes = parseInt(str);
      // console.log('parse integer ' + testDurationInMinutes);
    }    

    return AutoCompleteConstants.INVALID_FORMAT;
    // return 'Only this format [XX Mins] is allowed';
    // return 'Please enter valid value. [XX Mins] is valid';
  }

  // WORKING SOLUTION
  // getErrorMessage(value: string): string{

  //   let length = value.trim().length;
    
  //   if(length == 0){
  //     return AutoCompleteConstants.REQUIRED;
  //   }
  //   else if(length == 1){
  //     let firstCharacterInString: string = value.substring(0,1);
  //     let testDurationInMinutes: number = Number(firstCharacterInString);

  //     if(!(isNaN(testDurationInMinutes)) && (testDurationInMinutes >= 0 && testDurationInMinutes <= 3)){
  //       return AutoCompleteConstants.LESS_THAN_MIN_DURATION;
  //     }
  //   }
  //   else if(length >= 2){

  //     let firstTwoCharactersInString: string = value.substring(0,2);
  //     let testDurationInMinutes: number = Number(firstTwoCharactersInString);

  //     if(!(isNaN(testDurationInMinutes)) && testDurationInMinutes < 45){
  //       return AutoCompleteConstants.LESS_THAN_MIN_DURATION;
  //     }
  //   }    

  //   return AutoCompleteConstants.INVALID_FORMAT;
  //   // return 'Only this format [XX Mins] is allowed';
  //   // return 'Please enter valid value. [XX Mins] is valid';
  // }

  onKeyUp(event, tooltipText){    

    tooltipText.show();

    // to show red line, right away.. while typing
    if(!this.testingDurationControl.touched){      
      this.testingDurationControl.markAsTouched();
    }

    //this.appendAutoCompleteWordAtTheEnd(event, 'From Key up: ');
  }

  onKeyDown(event){
    console.log(event);
    // check this
    let foundMatch = new RegExp('^[0-9]$').test(event.key);
    console.log(foundMatch);
    
    if(!foundMatch){
      console.log(this.testingDurationControl.value);
      this.testingDurationControl.setValue('');
      return;
    }
  }

  keyPressNumbers(event) {

    console.log('key pressed ' + event.key);
    let timeDurationValue: string = this.testingDurationControl.value.toString().trim();

    if(timeDurationValue.length >= 2){      
      this.appendAutoCompleteWordAtTheEnd(event, timeDurationValue, 'From key press: ');
      return true;
    }
    else{
      if(this.onlyNumbers.test(event.key)){
        return true;
      }
      else{
        event.preventDefault();
        return false;
      }
    }
  }

  // Only Integer Numbers
  // keyPressNumbers(event) {
    
  //   var charCode = (event.which) ? event.which : event.keyCode;
  //   // Only Numbers 0-9
  //   if ((charCode < 48 || charCode > 57)) {
  //     event.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // Only Integer Numbers
  // keyPressNumbers(event) {

  //   let timeDurationValue: string = this.testingDurationControl.value.toString().trim();

  //   var charCode = (event.which) ? event.which : event.keyCode;

  //   if(charCode == 8 || charCode == 46){
  //     return true;
  //   }
  //   else if(timeDurationValue.length < 1){
  //     return true;
  //   }
  //   // Only Numbers 0-9
  //   else if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //     return false;
  //   }    
  //   else {
  //     return true;
  //   }
  // }


  // appendAutoCompleteWordAtTheEnd(event, message: string){

  //   let timeDurationValue: string = this.testingDurationControl.value.toString().trim();

  //   if(timeDurationValue.length >= 2){

  //     console.log(message + timeDurationValue.length);
  //     let key: string = event.key;

  //     if( key == "Backspace" || key == "Delete"){
  //       // do nothing
  //     }
  //     else{        
  //       // Append 'Mins' to the input value only when it is valid number and lies between the range 
  //       this.testingDurationControl.setValue(timeDurationValue.substring(0,2) + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING);
  //     }
  //   }
  //   else{
  //     var charCode = (event.which) ? event.which : event.keyCode;
  //     // Only Numbers 0-9
  //     if ((charCode < 48 || charCode > 57)) {
  //       event.preventDefault();
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }

  appendAutoCompleteWordAtTheEnd(event, controlValue: string, message: string){

    console.log(message + controlValue.length);
      let key: string = event.key;

      if( key == "Backspace" || key == "Delete"){
        // do nothing
      }
      else{        
        // Append 'Mins' to the input value only when it is valid number and lies between the range 
        this.testingDurationControl.setValue(controlValue.substring(0,2) + AutoCompleteConstants.AUTO_COMPLETE_APPEND_STRING);
      }
  }


  onAutoCompleteClose(){
    console.log('on auto complete close');
    let value:string = this.testingDurationControl.value.toString().trim();

    if(this.testingDurationControl.errors || value.length < AutoCompleteConstants.MAX_LENGTH){
      this.testingDurationControl.setErrors({
        'noOptionSelectedError': true
      });
    }
    else{
      // check if possible: previous value and current value are same or not
      // if same dont do service call; else do service call
      console.log('service call');
    }
  }

  autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      //console.log(validOptions);
      if (control && validOptions.indexOf(control.value.toString()) !== -1) {
        return null  /* valid option selected */
      }
      return { 'invalidAutocompleteString': true }
    }
  }

  // convertStringToNumber(event): boolean{
  //   let isValid: boolean = false;

  //   console.log(event);
  //   if(event.key)
  //   {
  //     let x = this.filterMatchingNumbers(Number(event.key));
  //     if(x && x.length > 0){
  //       isValid = true;
  //     }
  //     //isValid = this.isValidValue(Number(value));
  //   }

  //   console.log(isValid);
  //   return isValid;

  // }
}

const AutoCompleteConstants = {
  AUTO_COMPLETE_APPEND_STRING: " Mins",
  MAX_LENGTH : 7,
  REQUIRED: 'You must enter a value',
  RECOMMENDED_DURATION: 'Recommended test duration is 45 minutes',
  LESS_THAN_MIN_DURATION: 'Recommended and minimum duration is 45 minutes',
  EXCEEDED_MAX_DURATION: 'Maximum duration is 90 minutes',
  INVALID_FORMAT: 'Invalid format. Please select from the list'
}