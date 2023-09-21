// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {AddtodoComponent} from "./addtodo.component";
// import {TodoModule} from "../../todo.module";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {DebugElement} from "@angular/core";
// import {By} from "@angular/platform-browser";
//
// describe("input form tests", () => {
//   let component: AddtodoComponent;
//   let fixture: ComponentFixture<AddtodoComponent>
//   let h1: HTMLElement
//   let inputForm: DebugElement
//   let formSubmit: DebugElement
//   let todoFormValues: { name: string, type: string, imageFormGroup: { image: string } }
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AddtodoComponent],
//       imports: [TodoModule, BrowserAnimationsModule],
//     })
//
//     fixture = TestBed.createComponent(AddtodoComponent)
//     component = fixture.componentInstance;
//
//     h1 = fixture.nativeElement.querySelector("h1")
//     inputForm = fixture.debugElement.query(By.css('·todo-form'))
//     fixture.detectChanges()
//     localStorage.clear()
//
//     todoFormValues = {
//       name: 'test',
//       type: 'typ1',
//       imageFormGroup: {
//         image: 'https://tet.lv'
//       }
//     }
//   })
//
//   //Testa tests
//   it("should display title", () => {
//     expect(h1.textContent).toContain("Add todo!")
//   })
//
//   it("Should test if form exists AND validation works", () => {
//     const formGroup = component.todoFormGroup;
//     todoFormValues = {
//       name: '',
//       type: '',
//       imageFormGroup: {
//         image: ''
//       }
//     }
//     formGroup.setValue(todoFormValues)
//     expect(formGroup.value).toEqual(todoFormValues)
//     expect(formGroup.status).toBe("INVALID")
//   })
//
//   it("Should check if validation works ", () => {
//     let formGroup = component.todoFormGroup;
//     formGroup.setValue(todoFormValues)
//     expect(formGroup.status).toBe("VALID")
//   })
//
//   it("Should check if form submits and stores data", () => {
//     spyOn(component, "onSubmit")
//     spyOn(localStorage, 'setItem')
//
//     let formGroup = component.todoFormGroup;
//     formGroup.setValue(todoFormValues)
//
//     fixture.detectChanges()
//
//     component.hasSelected = true
//     formSubmit = fixture.debugElement.nativeElement.querySelector('.form-submit').click();
//
//     expect(component.onSubmit).toHaveBeenCalledTimes(1)
//     expect(formGroup.status).toBe("VALID")
//   })
// })
//
//
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtodoComponent } from './addtodo.component';
import { ReactiveFormsModule } from '@angular/forms';
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AddtodoComponent', () => {
  let component: AddtodoComponent;
  let fixture: ComponentFixture<AddtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtodoComponent ],
      imports: [ ReactiveFormsModule, TodoModule, BrowserAnimationsModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create form on ngOnInit', () => {
    expect(component.todoFormGroup).toBeTruthy();
    expect(component.todoFormGroup.get('name')).toBeTruthy();
    expect(component.todoFormGroup.get('imageFormGroup')).toBeTruthy();
    expect(component.todoFormGroup.get('type')).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.todoFormGroup.valid).toBeFalsy();
  });

  it('form should be valid when filled', () => {
    component.todoFormGroup.get('name')?.setValue('Test Name');
    component.todoFormGroup.get('imageFormGroup')?.get('image')?.setValue('Test Image');
    component.todoFormGroup.get('type')?.setValue('Test Type');
    expect(component.todoFormGroup.valid).toBeTruthy();

    component.todoFormGroup.get('name')?.setValue('12');
    expect(component.todoFormGroup.valid).toBeFalsy();
  });
});
