import { Component } from '@angular/core';
import { Todo } from '../../Interfaces/Todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  selectedTab: number = 0;
  showModal: boolean = false;
  toDeleteTodo!: [Todo, number];

  //Changes active tabs after form subnmit
  changeTab(event: number): void {
    this.selectedTab = event;
  }

  //toggles delete modal
  toggleModal(event: [Todo, number]): void {
    this.toDeleteTodo = event;
    this.showModal = true;
  }

  //Closes delete modal
  closeModal(event: boolean): void {
    this.showModal = event;
  }
}
