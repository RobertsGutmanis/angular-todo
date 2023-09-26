import { Injectable } from '@angular/core';
import { Todo } from '../Interfaces/Todo.interface';
import { Subject } from 'rxjs';

@Injectable()
export class LocalstorageService {
  todoSubject: Subject<Todo[]> = new Subject<Todo[]>();

  //Stores todos
  storeTodo(todo: Todo): void {
    if (localStorage.getItem('todos')) {
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '');
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.setItem('todos', JSON.stringify([todo]));
    }
    this.todoSubject.next(this.getTodos());
  }

  //Gets all todos
  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem('todos') ?? '');
  }

  //Gets one todo
  getOneTodo(index: number): Todo {
    const todos = JSON.parse(localStorage.getItem('todos') ?? '');
    return todos[index];
  }

  //Deletes todo
  deleteTodo(index: number): void {
    const todos: Todo[] = this.getTodos();
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.todoSubject.next(this.getTodos());
  }

  // Updates todo
  updateTodo(todo: Todo, index: number): void {
    const todos: Todo[] = this.getTodos();
    todos[index] = todo;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
