import { Injectable } from '@angular/core';
import {Todo} from "../Interfaces/Todo.interface";
import {BehaviorSubject, Subject} from "rxjs";
import {TodoModule} from "../todo.module";

@Injectable()
export class LocalstorageService{
  allTodos: Todo[] = []
  todoSubject: Subject<Todo[]> = new Subject<Todo[]>()
  constructor() { }

  //Stores todos
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

  //Gets all todos
  getTodos(): Todo[]{
    return JSON.parse(localStorage.getItem("todos") ?? "")
  }

  //Gets one todo
  getOneTodo(index: number): Todo{
    const todos = JSON.parse(localStorage.getItem('todos') ?? '')
    return todos[index]
  }

  //Deletes todo
  deleteTodo(index: number){
    const todos = this.getTodos()
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    this.todoSubject.next(this.getTodos())
  }

  // Updates todo
  updateTodo(todo: Todo, index: number){
    const todos = this.getTodos()
    todos[index] = todo;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
