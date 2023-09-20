import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalstorageService} from "../../services/localstorage.service";
import {MytodosComponent} from "./mytodos.component";
import {DebugElement} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

describe("Tests my Todo component", ()=> {

  let component: MytodosComponent;
  let fixture: ComponentFixture<MytodosComponent>
  let deleteButton: DebugElement
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytodosComponent],
      imports: [TodoModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [LocalstorageService]
    })
    localStorage.setItem("todos", JSON.stringify([{
      "todoName": "testTodo", "todoType": "type1", "todoImage": "mockUrl"}
    ]))
    fixture = TestBed.createComponent(MytodosComponent)
    component = fixture.componentInstance;

    router = TestBed.inject(Router);


  })
  it("should get all todos on ngOnInit", fakeAsync(()=>{
    component.ngOnInit()
    expect(component.myTodos).toEqual(JSON.parse(localStorage.getItem("todos") ?? ""))
  }))
  it("should emit event on delete button click", ()=>{
    component.ngOnInit()
    spyOn(component.toggleMoal, 'emit')
    fixture.detectChanges()
    deleteButton = fixture.debugElement.nativeElement.querySelector('.delete-button').click();
    expect(component.toggleMoal.emit).toHaveBeenCalledTimes(1)
  })
  it("should navigate to edit page on edit button click", ()=> {
    const spy = spyOn(router, 'navigate');
    component.ngOnInit()
    fixture.detectChanges()
    component.onEditTodo(0)
    fixture.detectChanges()
    expect(spy.calls.first().args[0]).toContain('/edit')
    expect(spy.calls.first().args[0]).toContain(0)
  })
  it("should display todos with entered name in search bar", ()=>{
    component.onSearchTodo({target: {value: "testTodo"}})
    expect(component.filteredTodos[0].todoName).toContain("testTodo")

    component.onSearchTodo({target: {value: ""}})
    expect(component.filteredTodos.length).toBeGreaterThanOrEqual(1)

    component.onSearchTodo({target: {value: "nonExistantTodo"}})
    expect(component.filteredTodos.length).toBeFalsy()
  })
  it("should toggle types in filters array", ()=>{
    component.onFilter("type1")
    expect(component.filters).toContain("type1")
    component.onFilter("type1")
    expect(component.filters).toEqual([])
    component.onFilter("type2")
    component.onFilter("type1")
    expect(component.filters).toContain("type1")
    expect(component.filters).toContain("type2")
    component.onFilter("type2")
    expect(component.filters.length).toEqual(1)
  })
})

