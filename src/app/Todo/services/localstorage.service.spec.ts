import {LocalstorageService} from "./localstorage.service";
import {TodoModel} from "../Models/Todo.model";
import {Todo} from "../Interfaces/Todo.interface";

describe("Tests localstorage service", () => {
  let service: LocalstorageService;
  let todoModel: TodoModel;
  beforeEach((): void => {
    todoModel = new TodoModel("testTodo", "type1", "mockUrl")
    localStorage.setItem("todos", JSON.stringify([todoModel.getTodo]))
    service = new LocalstorageService()
  })

  it("should expect to get todos", (): void  => {
    expect(service.getTodos()).toEqual(JSON.parse(localStorage.getItem("todos") ?? ""))
  })

  it("should expect to add todo", (): void  => {
    const newTodo: TodoModel = new TodoModel("New todo", "type1", "mockUrl")
    service.storeTodo(newTodo.getTodo)
    expect(service.getTodos()).toHaveSize(2)
  })

  it("should get one todo", (): void  => {
    expect(service.getOneTodo(0)).toEqual(JSON.parse(localStorage.getItem("todos") ?? "")[0])
  })

  it("should delete todo", (): void  => {
    service.deleteTodo(0)
    expect(service.getTodos()).toEqual([])
  })

  it("should edit todo", (): void  => {
    const updatedTodoModel: TodoModel = new TodoModel( "EditedName", "type3", "mockUrl")
    service.updateTodo(updatedTodoModel.getTodo, 0)
    expect(service.getOneTodo(0)).toEqual(updatedTodoModel.getTodo)
  })
})
