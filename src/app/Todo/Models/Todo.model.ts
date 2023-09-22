import { Todo } from '../Interfaces/Todo.interface';

export class TodoModel {
  private _todoName: string;
  private _todoType: string;
  private _todoImage: string;
  private _todoAlt: string;

  constructor(
    todoName: string,
    todoType: string,
    todoImage: string,
    todoAlt: string
  ) {
    this._todoName = todoName;
    this._todoType = todoType;
    this._todoImage = todoImage;
    this._todoAlt = todoAlt;
  }

  get getTodo(): Todo {
    return {
      todoName: this._todoName,
      todoType: this._todoType,
      todoImage: this._todoImage,
      todoAlt: this._todoAlt,
    };
  }
}
