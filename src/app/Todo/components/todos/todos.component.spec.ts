import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoModule } from '../../todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TodosComponent } from './todos.component';
import { TodoModel } from "../../Models/Todo.model";
import { Todo } from "../../Interfaces/Todo.interface";

describe('Test modal and tab functionality', (): void => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [TodoModule, BrowserAnimationsModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('Should change tabs on changeTab()', (): void => {
    spyOn(component, 'changeTab');
    component.changeTab(1);
    expect(component.changeTab).toHaveBeenCalledWith(1);
  });

  it('should test if close modal works', (): void => {
    spyOn(component, 'closeModal');
    component.closeModal(true);
    expect(component.closeModal).toHaveBeenCalledWith(true);
  });

  it('should make modal visible after function call', ()=>{
    const event: [Todo, number] = [new TodoModel('testtodo', 'type1', 'img.png', 'alt').getTodo, 0]
    component.toggleModal(event)
    expect(component.toDeleteTodo).toEqual(event);
    expect(component.showModal).toBeTrue()
  })
});
