import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmDeleteComponent} from "./confirm-delete.component";
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";
import {LocalstorageService} from "../../services/localstorage.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";


describe("Tests confirm delete modal", () => {

  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>
  let closeButton: DebugElement
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      imports: [TodoModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [LocalstorageService]
    })

    fixture = TestBed.createComponent(ConfirmDeleteComponent)
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

  })

  it("should close modal on close button click", () => {
    spyOn(component.closeModal, 'emit')
    closeButton = fixture.debugElement.nativeElement.querySelector('.close-modal').click();
    expect(component.closeModal.emit).toHaveBeenCalledWith(false)
  })

  it("should delete todo, close modal", () => {
    spyOn(component, "onDelete")
    closeButton = fixture.debugElement.nativeElement.querySelector('.delete-todo').click();
    expect(component.onDelete).toHaveBeenCalled()
  })
  // Experimental
  it("should redirect to / after edit button click", () => {
    component.todo = [{todoName: "test", todoType: "type1", todoImage: "http://test.jpg"}, 0]
    const spy = spyOn(router, 'navigate');
    component.onDelete()
    expect(spy.calls.first().args[0]).toContain('/')
  })
})
