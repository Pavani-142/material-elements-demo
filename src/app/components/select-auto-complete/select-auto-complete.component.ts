import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { parse } from 'querystring';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-select-auto-complete',
  templateUrl: './select-auto-complete.component.html',
  styleUrls: ['./select-auto-complete.component.css']
})
export class SelectAutoCompleteComponent implements OnInit {

  // atleastTwoNumbers: string = '^[0-9][0-9][ a-zA-Z]*$';
  // textPattern: string = '^([0-9]+ | [0-9]{2}[ ]Mins)$';
  //textPattern: string = '^[0-9]{2}$';
  // textPattern: string = '^([0-9]{1}) | ([0-9]{2}[ ]Mins)$';

  textPattern: string = '^([4-9]([0-9]{1}([ ]Mins)*)*)$';
  
  testingDurationControl: FormControl;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.testingDurationControl = new FormControl('', [Validators.required, 
      Validators.pattern(this.textPattern), Validators.max(90)]);

    // this.myControl = new FormControl('', [Validators.required, 
    //   Validators.pattern(this.textPattern), this.autocompleteStringValidator(this.options)]);

    // this.myControl = new FormControl('', [Validators.required, 
    //   Validators.min(45), Validators.max(90), Validators.pattern(this.textPattern)]);

    // this.myControl = new FormControl('', [Validators.required, this.testingPeriodValidator(45, 90)]);

    this.fillOptions();

    this.filteredOptions = this.testingDurationControl.valueChanges.pipe(
      startWith(''),      
      map(value => this._filter(value))
    );
  }

  fillOptions() {
    for(let i = 45; i <= 90; i++){
      let option: string = i + ' Mins';
      this.options.push(option);
    }
  }

  private _filter(value: string): string[] {

    // const filterValue = value.toString().trim().toLocaleLowerCase();
    const filterValue = value.toString().replace(/\s+/g, '').toLocaleLowerCase();
    return this.options.filter(option => option.replace(/\s+/g, '').toLocaleLowerCase().indexOf(filterValue) === 0);
  }


  // //TODO: Trim zeroes in first letter
  // getErrorMessage(): string{
  //   return this.myControl.hasError('required') ? 'You must enter a value' :
  //       this.myControl.hasError('max') ? 'Maximum duration is 90 minutes' :
  //       this.myControl.hasError('min') ? 'Recommended and minimum duration is 45 minutes' :
  //       this.myControl.hasError('pattern') ? this.getPatternErrorMessage() :
  //       'Recommended test duration is 45 minutes';
  // }

  //TODO: Trim zeroes in first letter
  getToolTipMessage(): string{
    return this.testingDurationControl.hasError('required') ? 'You must enter a value' :
        this.testingDurationControl.hasError('pattern') ? this.getPatternErrorMessage() :
        this.testingDurationControl.hasError('max') ? 'Maximum duration is 90 minutes' :
        this.testingDurationControl.hasError('regexPatternError') ? 'Only this format [XX Mins] is allowed':
        this.checkIfValueisRecommendedDuration()? ''
        : 'Recommended test duration is 45 minutes';
  }

  checkIfValueisRecommendedDuration(): boolean{
    
    let value: string = this.testingDurationControl.value;

    if(value.length >= 2){
      let firstTwoCharactersInString: string = value.substring(0,2);
      let testDurationInMinutes: number = parseInt(firstTwoCharactersInString);

      if(testDurationInMinutes == 45)
        return true;
    }

    return false;
  }

  getPatternErrorMessage(): string{

    let actualEnteredValue:string = this.testingDurationControl.getError('pattern').actualValue;
    actualEnteredValue = actualEnteredValue.trim();
    
    if(actualEnteredValue.length >= 2){
      let firstTwoCharactersInString: string = actualEnteredValue.substring(0,2);
      let testDurationInMinutes: number = parseInt(firstTwoCharactersInString);
      // console.log(actualEnteredValue.substring(0,2));
      // console.log('number ' + convertedNum);

      if(isNaN(testDurationInMinutes)){
        return 'Only this format [XX Mins] is allowed';
      }
      else if(testDurationInMinutes < 45){
        return 'Recommended and minimum duration is 45 minutes';
      }
      else if(testDurationInMinutes > 90){
        return 'Maximum duration is 90 minutes';
      }
    }
    else if(actualEnteredValue.length == 1){
      let firstCharacterInString: string = actualEnteredValue.substring(0,1);
      let testDurationInMinutes: number = parseInt(firstCharacterInString);

      if(!(isNaN(testDurationInMinutes)) && (testDurationInMinutes >= 0 && testDurationInMinutes <= 3)){
        return 'Recommended and minimum duration is 45 minutes';
      }
    }

    return 'Only this format [XX Mins] is allowed';
    // return 'Please enter valid value. [XX Mins] is valid';
  }

  onInput(event, tooltipText){    

    console.log(this.testingDurationControl);

    tooltipText.show();

    if(!this.testingDurationControl.touched){
      // to show red line, right away.. while typing
      this.testingDurationControl.markAsTouched();
    }

    this.appendAutoCompleteWordAtThenEnd(event);
  }

  appendAutoCompleteWordAtThenEnd(event){

    let timeDurationValue: string = this.testingDurationControl.value;

    //see if trim() is used or not
    if(timeDurationValue.toString().trim().length == 2){

      // var key = event.keyCode || event.charCode || event.which;      
      // console.log(event.keyCode);
      // console.log(event.charCode);
      // console.log(event.which);
      // if( key == 8 || key == 46 ){        
          // 8 means backspace; 46 means delete; do nothing for this keys
      // }

      let key: string = event.key;
      if( key == "Backspace" || key == "Delete"){
        // do nothing
      }
      else{        
        // Append 'Mins' to the input value only when it is valid number and lies between the range 
        let num = parseInt(timeDurationValue);
          if(!isNaN(num) && (num >=45 && num <= 90)){
            this.testingDurationControl.setValue(timeDurationValue + " Mins");
          }
      }
    }
  }


  testingPeriodValidator(min: number, max: number){      

    return (control: AbstractControl):{[key: string]: boolean} | null => {
  
      if( control.value !==null && (isNaN(control.value) || control.value <min  || control.value> max)){
        return {'testingPeriodValidator': true}
      }
      return null;
    };
  }

  displayWith(obj?: any): string | undefined {
    return obj ? obj + ' Mins' : undefined;
  }

  onOutFocus(){
    if(this.testingDurationControl.value.toString().trim().length < 2){
      this.testingDurationControl.setErrors({
        'min': true
      });
    }
  }

  autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      //console.log(validOptions);
      if (validOptions.indexOf(control.value.toString()) !== -1) {
        return null  /* valid option selected */
      }
      return { 'invalidAutocompleteString': { value: control.value } }
    }
  }

  onOptionSelect(){
    console.log('option is selected');
  }

  onAutoCompleteClose(){
    console.log('on auto complete close');

    let value = this.testingDurationControl.value.toString().trim();

    if(this.testingDurationControl.errors || value.length < 7){
      this.testingDurationControl.setErrors({
        'regexPatternError': true
      });
    }
    else{
      // only if there are no errors and regex is matched
      // check if previous value and current value are same or not
      // if same dont do service call; else do service call
      console.log('service call');
    }
  }

  // onAutoCompleteClose(){
  //   console.log('on auto complete close');

  //   if(this.myControl.value.toString().trim().length < 2){
  //     this.myControl.setErrors({
  //       'minCharacterLength': this.myControl.value
  //     });
  //   }
  //   // else if(!RegExp("[0-9]{2}[ ]Mins").test(this.myControl.value)){
  //   //   this.myControl.setErrors({
  //   //     'pattern': this.myControl.value
  //   //   });
  //   // }
  //   else if(this.myControl.errors){
  //     // do nothing
  //   }
  //   else{
  //     // check if previous value and current value are same or not
  //     // if same dont do service call
  //     // do service call
  //   }
  // }
}
