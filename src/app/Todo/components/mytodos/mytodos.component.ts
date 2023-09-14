import { Component, OnInit } from '@angular/core';
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";
import {  Router } from '@angular/router';

@Component({
  selector: 'app-mytodos',
  templateUrl: './mytodos.component.html',
  styleUrls: ['./mytodos.component.css']
})
export class MytodosComponent implements OnInit {
  myTodos: Todo[] = []
  filters:string[] = []
  constructor(private localStorage: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("todos")){
      this.myTodos = this.localStorage.getTodos()
    }
    this.localStorage.todoSubject.subscribe({
      next: newTodos =>{
        this.myTodos = newTodos
      }
    })
  }
  // Delete function on delete button click
  onDeleteTodo(index: number){
  this.localStorage.deleteTodo(index);
  }

  //Edit function on edit button click
  onEditTodo(index: number){
    this.router.navigate(['/edit', index])
  }

  //Searches for todos on search input
  onSearchTodo(data:any){
    this.myTodos = this.localStorage.getTodos()
    const filteredTodos: Todo[] = this.myTodos.filter((todo)=>todo.todoName.includes(data.target.value))
    this.myTodos = filteredTodos
  }

  //FIlters todos on checbox input
  onFilter(type: string){
    let indexOfType = this.filters.indexOf(type)
    //Checks if filter is active
    if(indexOfType>=0){
     this.filters.splice(indexOfType, 1)
    }else{
      this.filters.push(type)
    }

    //DIsplays filtered todos
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
