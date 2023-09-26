import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ConfirmDeleteComponent } from './confirm-delete.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { TodoModule } from '../../todo.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoModel } from '../../Models/Todo.model';
import { Router } from '@angular/router';

describe('DeleteComponent', () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;
  let closeButton: HTMLElement;
  let deleteButton: HTMLElement;
  let storageService: LocalstorageService;
  let testTodo: TodoModel;
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      imports: [TodoModule, RouterTestingModule],
      providers: [LocalstorageService],
    });

    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
    closeButton = fixture.nativeElement.querySelector('.close-button');
    deleteButton = fixture.nativeElement.querySelector('.delete-button');
    storageService = TestBed.inject(LocalstorageService);
    testTodo = new TodoModel('test todo', 'type1', 'http://url.png', 'alt');
    component.todo = [testTodo.getTodo, 0];
    storageService.storeTodo(testTodo.getTodo);
  });

  it('should test if modal is closed after close modal button click', (): void => {
    spyOn(component.closeModal, 'emit');
    closeButton.click();
    expect(component.closeModal.emit).toHaveBeenCalledWith(false);
  });

  it('should test if modal close on delete button click', (): void => {
    spyOn(component.closeModal, 'emit');
    deleteButton.click();
    expect(component.closeModal.emit).toHaveBeenCalledWith(false);
  });

  it('should navigate user to / after delete button click', (): void => {
    const router: Router = TestBed.inject(Router)
    spyOn(router, 'navigate');
    deleteButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
