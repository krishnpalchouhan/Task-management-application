import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-example.css'],
})
export class CdkDragDropConnectedSortingExample implements AfterViewInit  {

  cdkDropTrackLists: CdkDropList[] = [];
  @ViewChildren(CdkDropList)
  set cdkDropLists(value: QueryList<CdkDropList>) {
    this.cdkDropTrackLists = value.toArray();
  }
  
  listOfConnection:any = [];
  setConnectedToObjValue(values: any) {
    this.todoListConfig.cards.forEach(e=>{
      e.connectedTo.forEach((e,obj) =>{
        debugger;
      })
      
    })
  }
  todoListConfig = {
    cards: [
      {
        name: "To Do",
        id: "todo",
        connectedTo:['inProgress','todo'],
        connectedToObj:[],
        list: [
          'Get to work',
          'Pick up groceries',
          'Go home',
          'Fall asleep'
        ],
        model:""
      },
      {
        name: "In Progress",
        id: "inProgress",        
        connectedTo:['done','inProgress','todo'],
        connectedToObj:[],
        list: [
          'inp1',
          'inp3',
          'inp2',
        ],
        model:""
      },
      {
        name: "Done",
        id: "done",
        connectedTo:['done','inProgress'],
        connectedToObj:[],
        list: [
          'Get up',
          'Brush teeth',
          'Take a shower',
          'Check e-mail',
          'Walk dog'
        ],
        model:""
      },
    ]
  }

  addNewCard(event: any){
    event.push('newData')
    console.log(event)

  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  constructor(){
  // this.setConnectedToObjValue(this.cdkDropTrackLists);  
  }
  ngAfterViewInit(): void {
    if(this.cdkDropTrackLists && this.todoListConfig.cards){
    this.todoListConfig.cards[0].connectedToObj.push(this.cdkDropTrackLists[1]);
    this.todoListConfig.cards[1].connectedToObj.push(this.cdkDropTrackLists[0]);
    this.todoListConfig.cards[1].connectedToObj.push(this.cdkDropTrackLists[2]);
    this.todoListConfig.cards[2].connectedToObj.push(this.cdkDropTrackLists[1]);
    }
  } 
}