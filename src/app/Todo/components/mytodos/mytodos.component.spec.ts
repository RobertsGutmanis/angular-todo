import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TodoModule } from '../../todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalstorageService } from '../../services/localstorage.service';
import { MytodosComponent } from './mytodos.component';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

describe('Tests my Todo component', (): void => {
  let component: MytodosComponent;
  let fixture: ComponentFixture<MytodosComponent>;
  let deleteButton: DebugElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytodosComponent],
      imports: [
        TodoModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [LocalstorageService],
    });
    localStorage.setItem(
      'todos',
      JSON.stringify([
        {
          todoName: 'testTodo',
          todoType: 'type1',
          todoImage: 'mockUrl',
        },
      ])
    );
    fixture = TestBed.createComponent(MytodosComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should get all todos on ngOnInit', fakeAsync(() => {
    expect(component.myTodos).toEqual(
      JSON.parse(localStorage.getItem('todos') ?? '')
    );
  }));

  it('should emit event on delete button click', () => {
    spyOn(component.toggleModal, 'emit');
    fixture.detectChanges();
    deleteButton = fixture.debugElement.nativeElement
      .querySelector('.delete-button')
      .click();
    expect(component.toggleModal.emit).toHaveBeenCalledWith([component.myTodos[0], 0])
  });

  it('should display todos with entered name in search bar', () => {
    component.onSearchTodo({target: {value: 'testTodo'}})
    expect(component.myTodos[0].todoName).toContain('testTodo')

    component.onSearchTodo({target: {value: ""}})
    expect(component.myTodos.length).toBeGreaterThanOrEqual(1)

    component.onSearchTodo({target: {value: 'nonExistentTodo'}})
    expect(component.myTodos.length).toBe(0)
  })

  it("should change tabs after add todos button click", ()=>{
    spyOn(component.changeTabsEmitter, 'emit')
    component.myTodos = []
    fixture.detectChanges()
    fixture.nativeElement.querySelector('.add-todos').click()
    expect(component.changeTabsEmitter.emit).toHaveBeenCalledWith(1)
  })

  it('should toggle types in filters array', (): void => {
    component.onFilter('type1');
    expect(component.filters).toContain('type1');
    expect(component.myTodos.length).toBe(1)
    component.onFilter('type1');
    expect(component.filters).toEqual([]);
    expect(component.myTodos.length).toBe(1)
    component.onFilter('type2');
    component.onFilter('type1');
    expect(component.filters).toContain('type1');
    expect(component.filters).toContain('type2');
    expect(component.myTodos.length).toBe(1)
    component.onFilter('type1');
    expect(component.filters.length).toEqual(1);
    expect(component.myTodos.length).toBe(0)
  });
});
