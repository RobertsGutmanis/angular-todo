import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoModule } from '../../todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalstorageService } from '../../services/localstorage.service';
import { TodosComponent } from './todos.component';

describe('Test modal and tab functionallity', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [TodoModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [LocalstorageService],
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });
  it('Should change tabs on changeTab()', () => {
    spyOn(component, 'changeTab');
    component.changeTab(1);
    expect(component.changeTab).toHaveBeenCalledWith(1);
  });
  it('should test if close modal works', () => {
    spyOn(component, 'closeModal');
    component.closeModal(true);
    expect(component.closeModal).toHaveBeenCalledWith(true);
  });
});
