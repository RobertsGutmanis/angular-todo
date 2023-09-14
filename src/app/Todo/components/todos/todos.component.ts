import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../../Interfaces/Todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  selectedTab: number = 0;
  showModal: boolean = false;
  todoID: number = 0;
  toDeleteTodo!: [Todo, number];

  constructor() { }

  ngOnInit(): void {
  }
  changeTab(event: number){
    this.selectedTab = event
    console.log(this.selectedTab)
  }
  toggleModal(event: [Todo, number]){
    this.toDeleteTodo = event
    this.showModal = true;
  }
  closeModal(event: boolean){
    this.showModal = event;
  }
}
