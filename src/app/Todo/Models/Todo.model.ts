import {Todo} from "../Interfaces/Todo.interface";

export class TodoModel {
  private _todoName: string;
  private _todoType: string;
  private _todoImage: string;

  constructor(todoName: string, todoType: string, todoImage: string) {
    this._todoName = todoName;
    this._todoType = todoType;
    this._todoImage = todoImage;
  }
  get getTodo(): Todo{
    return {todoName: this._todoName, todoType: this._todoType, todoImage: this._todoImage}
  }


}
