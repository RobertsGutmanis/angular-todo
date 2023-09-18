import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AddtodoComponent} from "./addtodo.component";
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
describe("input form tests", ()=>{
  let component: AddtodoComponent;
  let fixture: ComponentFixture<AddtodoComponent>
  let h1: HTMLElement
  let inputForm: HTMLElement
  let inputElements: NodeListOf<HTMLElement>;
  let todoFormValues: {name: string, type: string, imageFormGroup: {image: string}}

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [AddtodoComponent],
      imports: [TodoModule, BrowserAnimationsModule],
    })
    fixture = TestBed.createComponent(AddtodoComponent)
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector("h1")
    inputForm = fixture.nativeElement.querySelector('.todo-form')
    inputElements = inputForm.querySelectorAll(".todo-form-input");
    fixture.detectChanges()
    localStorage.clear()
    todoFormValues = {
      name: 'test',
      type: 'typ1',
      imageFormGroup: {
        image: 'https://tet.lv'
      }
    }
  })

  //Testa tests
  it("should display title", ()=>{
    expect(h1.textContent).toContain("Add todo!")
    expect(inputElements.length).toEqual(2)
  })

  it("Should test if form exists AND validation works", ()=>{
    const formGroup = component.todoFormGroup;
    todoFormValues = {
      name: '',
      type: '',
      imageFormGroup: {
        image: ''
      }
    }
    expect(formGroup.value).toEqual(todoFormValues)
    expect(formGroup.status).toBe("INVALID")
  })

  it("Should check if validation works ", ()=>{
    let formGroup = component.todoFormGroup;
    formGroup.setValue(todoFormValues)
    expect(formGroup.status).toBe("VALID")
  })

  it("Should check if form submits and stores data", ()=>{
    let formGroup = component.todoFormGroup;
    formGroup.setValue(todoFormValues)
    fixture.detectChanges()
    expect(localStorage.getItem("todos")??"").toEqual('')
  })
})

