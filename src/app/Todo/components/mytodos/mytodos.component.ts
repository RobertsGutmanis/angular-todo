import { Component, OnInit } from '@angular/core';
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-mytodos',
  templateUrl: './mytodos.component.html',
  styleUrls: ['./mytodos.component.css']
})
export class MytodosComponent implements OnInit {
  myTodos: Todo[] = []
  searchValue = ""
  constructor(private localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.myTodos = this.localStorage.getTodos()
    this.localStorage.todoSubject.subscribe({
      next: newTodos =>{
        this.myTodos = newTodos
      }
    })
  }
  onDeleteTodo(index: number){
  this.localStorage.deleteTodo(index);
  }
  onEditTodo(){

  }
  onSearchTodo(data:any){
    this.myTodos = this.localStorage.getTodos()
    const filteredTodos = this.myTodos.filter((todo)=>todo.todoName.includes(data.target.value))
    this.myTodos = filteredTodos
  }
}
