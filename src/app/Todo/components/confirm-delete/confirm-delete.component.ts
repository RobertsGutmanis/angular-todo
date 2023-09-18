import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Todo } from '../../Interfaces/Todo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter()
  @Input() todo!: [Todo, number];


  constructor(private localStorage: LocalstorageService, private router: Router) { }

  onCloseModal(){
    this.closeModal.emit(false)
  }
  onDelete(){
    this.localStorage.deleteTodo(this.todo[1])
    this.router.navigate(['/'])
    this.closeModal.emit(false)
  }
}
