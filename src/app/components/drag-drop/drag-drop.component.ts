import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  numbers: number[] = [];
  otherNumbers: number[] = [];

  constructor() { 
    for(let i = 0; i< 10; i++){
      this.numbers.push(i);
    }
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<number[]>){

    if(event.previousContainer !== event.container){
      //transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      copyArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    else{
      moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
    }  
  }

}
