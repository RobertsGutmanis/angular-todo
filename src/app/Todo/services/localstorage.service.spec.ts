import { TestBed } from '@angular/core/testing';
import { LocalstorageService } from './localstorage.service'
import { TodoModel } from '../Models/Todo.model'

describe('LocalstorageService', () => {
  let service: LocalstorageService;
  let todoModel: TodoModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    todoModel = new TodoModel('testTodo', 'type1', 'mockUrl', 'alt');
    localStorage.setItem('todos', JSON.stringify([todoModel.getTodo]));
    service = new LocalstorageService()
  });

  it('should store todo', () => {
    const newTodo: TodoModel = new TodoModel('New todo', 'type1', 'mockUrl', 'alt');
    service.storeTodo(newTodo.getTodo);
    expect(service.getTodos()).toHaveSize(2);
  });

  it('should get todos', () => {
    expect(service.getTodos()).toEqual(JSON.parse(localStorage.getItem('todos') ?? ''));
  });

  it('should get one todo', () => {
    expect(service.getOneTodo(0)).toEqual(JSON.parse(localStorage.getItem('todos') ?? '')[0]);
  });

  it('should delete todo', () => {
    service.deleteTodo(0);
    expect(service.getTodos()).toEqual([]);
  });

  it('should update todo', () => {
    const updatedTodoModel: TodoModel = new TodoModel('EditedName', 'type3', 'mockUrl', 'alt');
    service.updateTodo(updatedTodoModel.getTodo, 0);
    expect(service.getOneTodo(0)).toEqual(updatedTodoModel.getTodo);
  });
});
