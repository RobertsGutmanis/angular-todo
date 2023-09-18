import {LocalstorageService} from "./localstorage.service";
import {Todo} from "../Interfaces/Todo.interface";

describe("Tests localstorage service", ()=>{
  let service: LocalstorageService;
  beforeEach(()=>{
    localStorage.setItem("todos", JSON.stringify([{
      "todoName": "testTodo", "todoType": "type1", "todoImage": "mockUrl"}
    ]))
    service = new LocalstorageService()
  })

  it("should expect to get todos", ()=>{
    expect(service.getTodos()).toEqual(JSON.parse(localStorage.getItem("todos") ?? ""))
  })

  it("should expect to add todo", ()=>{
    service.storeTodo({"todoName": "test1", "todoType": "type2", "todoImage": "mockURL1"})
    expect(service.getTodos()).toHaveSize(2)
  })

  it("should get one todo", ()=>{
    expect(service.getOneTodo(0)).toEqual(JSON.parse(localStorage.getItem("todos") ?? "")[0])
  })

  it("should delete todo", ()=>{
    service.deleteTodo(0)
    expect(service.getTodos()).toEqual([])
  })

  it("should edit todo", ()=>{
    service.updateTodo({"todoName": "EditedName", "todoType": "type3", "todoImage": "mockUrl"}, 0)
    expect(service.getOneTodo(0)).toEqual({"todoName": "EditedName", "todoType": "type3", "todoImage": "mockUrl"})
  })
})
