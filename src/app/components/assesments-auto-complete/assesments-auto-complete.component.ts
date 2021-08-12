import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { MatAutocomplete, MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/** Custom options the configure the tooltip's default show/hide delays. */
 export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay:0,
  hideDelay: 0,
  touchendHideDelay: 0,
  position: 'above'
};

@Component({
  selector: 'app-assesments-auto-complete',
  templateUrl: './assesments-auto-complete.component.html',
  styleUrls: ['./assesments-auto-complete.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ]
})
export class AssesmentsAutoCompleteComponent implements OnInit {

  @Input() minValue: number;
  @Input() maxValue: number;
  @Output() onSelectedValue: EventEmitter<number>;
  RECOMMENDED_DURATION_VALUE: number = 45;
  clearInputOnNextFocus: boolean = false;
  @ViewChild('autoCompleteRef', { static: false }) autoCompleteRef: MatAutocomplete;

  defaultValue: number;

  textPattern: string = '^[0-9]{1,2}$';
  onlyNumbers: RegExp = new RegExp('^[0-9]$');
  
  testDurationControl: FormControl;
  options: number[] = [];
  filteredOptions: Observable<number[]>;

  ngOnInit() {

    // TODO: either selected or min value
    this.defaultValue = this.minValue;
    this.fillOptions();

    this.testDurationControl = new FormControl(this.defaultValue, [Validators.max(90), this.customValidator(this.options)]);

    this.filteredOptions = this.testDurationControl.valueChanges.pipe(
      startWith(0 as number),      
      map(value => this.getfilteredList(value))
    );

    // this.filteredOptions = this.testingDurationControl.valueChanges.pipe(
    //   startWith(this.minValue),      
    //   map(value => this._filter(value))
    // );
  }

  fillOptions() {
    for(let i = this.minValue; i <= this.maxValue; i++){
      let option: number = i;
      this.options.push(option);
    }
  }

  getfilteredList(value: number): number[] {

    // no need to trim because, space is not allowed in input type = number
    // check for null returning value
    if(value){
      let filterValue = value? value.toString(): null;
      return this.options.filter(option => option.toString().indexOf(filterValue) === 0);
    }
    return this.options;
  }

  filterMatchingNumbers(value: number): number[]{
    let filterValue = value? value.toString(): null;
    return this.options.filter(option => option.toString().indexOf(filterValue) === 0);
  }

  
  getToolTipMessage(): string{
    let returnValue: string = this.testDurationControl.hasError('max') ? AutoCompleteConstants.EXCEEDED_MAX_DURATION :
        this.testDurationControl.hasError('pattern') ? AutoCompleteConstants.INVALID_FORMAT :   
        this.testDurationControl.hasError('notAValidValue') ? this.getErrorMessage(this.testDurationControl.value) :   
        this.testDurationControl.hasError('noOptionSelectedError') ? this.getErrorMessage(this.testDurationControl.value)
        : AutoCompleteConstants.RECOMMENDED_DURATION;
    
    return returnValue;
  }

  checkIfValueisRecommendedDuration(): boolean{
    
    if(this.testDurationControl.value){

      let testDuration: number = this.testDurationControl.value;
      if(testDuration == this.RECOMMENDED_DURATION_VALUE){
        return true;
      }
    }
    return false;
  }

  // This method will call when the input value is not a 
  // part of the options list
  getErrorMessage(value: number): string{

    if(value){
      return AutoCompleteConstants.LESS_THAN_MIN_DURATION;
    }

    // TODO: ASK
    return AutoCompleteConstants.REQUIRED;
  }

  onInput(tooltipText){    
    tooltipText.show();

    // to show red line, right away.. while typing
    if(!this.testDurationControl.touched){      
      this.testDurationControl.markAsTouched();
    }
  }

  onFocus(){

   
  }

  onClick(){

    if(this.testDurationControl.hasError('noOptionSelectedError')){
      this.testDurationControl.setErrors(null);
    }
    if(this.clearInputOnNextFocus){
      this.clearInputOnNextFocus = false;
      this.testDurationControl.reset();
    }
  }

  isValidValue(testDuration: number): boolean{

    console.log(testDuration);

    if(isNaN(testDuration))
      return false;
    else if(testDuration && (testDuration >= this.minValue && testDuration <= this.maxValue))
      return true;
    else
      return false;
  }

  onAutoCompleteClose(){

    console.log('on auto complete close');
    if(this.testDurationControl.errors || !this.isValidValue(this.testDurationControl.value)){
      this.testDurationControl.setErrors({
        'noOptionSelectedError': true
      });
    }
    else{
      this.clearInputOnNextFocus = true;
      console.log(' this.clearInputOnNextFocus: ' + this.clearInputOnNextFocus);
      this.defaultValue = this.testDurationControl.value;
      // check if possible: previous value and current value are same or not
      // if same dont do service call; else do service call
      console.log('service call');
    }
  }

  customValidator(validOptions: Array<number>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      let foundMatch = false;

      // let filteredValues = validOptions.filter(option => option.toString().indexOf(control.value.toString()) === 0);
      // no need to trim because, space is not allowed in input type = number

      let filteredValues = this.getfilteredList(control.value);
      if(filteredValues && filteredValues.length > 0){
        foundMatch = true;
      }

      if (foundMatch) {
        return null  /* valid option selected */
      }
      return { 'notAValidValue': true }
    }
  }

}

const AutoCompleteConstants = {
  MAX_LENGTH : 2,
  REQUIRED: 'You must enter a numeric value',

  // TODO: change values based on min, max
  RECOMMENDED_DURATION: 'Recommended test duration is 45 minutes',
  LESS_THAN_MIN_DURATION: 'Recommended and minimum duration is 45 minutes',
  EXCEEDED_MAX_DURATION: 'Maximum duration is 90 minutes',
  INVALID_FORMAT: 'Only Numeric values are allowed'
}