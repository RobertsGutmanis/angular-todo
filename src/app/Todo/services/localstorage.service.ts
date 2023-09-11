import { Injectable } from '@angular/core';
import {Todo} from "../Interfaces/Todo.interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService{
  allTodos: Todo[] = []
  todoSubject: Subject<Todo[]> = new Subject<Todo[]>()
  constructor() { }

  storeTodo(todo: Todo){
    if(localStorage.getItem('todos')){
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? "")
      todos.push(todo)
      localStorage.setItem("todos", JSON.stringify(todos));
    }else {
      this.allTodos.push(todo)
      localStorage.setItem("todos", JSON.stringify(this.allTodos));
    }
    this.todoSubject.next(this.getTodos())
  }
  getTodos(): Todo[]{
    return JSON.parse(localStorage.getItem("todos") ?? "")
  }
  deleteTodo(index: number){
    const todos = this.getTodos()
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    this.todoSubject.next(this.getTodos())
  }
}
