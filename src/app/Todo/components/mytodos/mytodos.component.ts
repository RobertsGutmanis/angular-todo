import { Component, OnInit } from '@angular/core';
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-mytodos',
  templateUrl: './mytodos.component.html',
  styleUrls: ['./mytodos.component.css']
})
export class MytodosComponent implements OnInit {
  myTodos: Todo[] = []
  filters:string[] = []
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
    const filteredTodos: Todo[] = this.myTodos.filter((todo)=>todo.todoName.includes(data.target.value))
    this.myTodos = filteredTodos
  }
  onFilter(type: string){
    if(this.filters.indexOf(type)>=0){
     this.filters.splice(this.filters.indexOf(type), 1)
    }else{
      this.filters.push(type)
    }
    if(this.filters.length===0) {
      this.myTodos = this.localStorage.getTodos()
    }else{
      let placeholderArray: Todo[] = []
      this.filters.forEach((filter, index)=>{
        let todoArray: Todo[] = this.localStorage.getTodos().filter((todo)=>todo.todoType.includes(filter))
        placeholderArray.push(...todoArray)
      })
      this.myTodos = placeholderArray
    }
  }
}
