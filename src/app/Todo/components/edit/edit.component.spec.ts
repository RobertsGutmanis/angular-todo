import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalstorageService} from "../../services/localstorage.service";
import {EditComponent} from "./edit.component";
describe("Tests confirm delete modal", ()=> {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>
  let closeButton: DebugElement
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      imports: [TodoModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [LocalstorageService, LocalstorageService]
    })

    fixture = TestBed.createComponent(EditComponent)
    router = TestBed.inject(Router);
    component = fixture.componentInstance

    localStorage.setItem("todos", JSON.stringify([{todoName: "todo", todoType: "type1", todoImage: "http:image.png"}]))
    component.index = "0"
    spyOn(component, "ngOnInit")
    component.ngOnInit()
    fixture.detectChanges()

  })
  it("Should fill input elements with active todo data", ()=>{
    expect(component.ngOnInit).toHaveBeenCalled()
    expect(component.editFromGroup.value).toEqual({...JSON.parse(localStorage.getItem("todos") ?? "")[0], imageQuery: ''})
  })
  it("Should submit edited todo and check if valid", ()=>{
    spyOn(component, 'onSubmit')
    component.editFromGroup.value.todoName = "editedTodo"
    fixture.detectChanges()
    expect(component.editFromGroup.status).toEqual("VALID")
    component.onSubmit()
    fixture.detectChanges()
    expect(component.onSubmit).toHaveBeenCalled()
    component.editFromGroup.setValue({todoName: "", todoType: "", todoImage: "", imageQuery: ''})
    expect(component.editFromGroup.status).toEqual("INVALID")
  })

  it("should test hasSelectedImage() functionality", ()=>{
    spyOn(component, "hasSelectedImage")
    component.editFromGroup.value.imageQuery = "cat"
    fixture.detectChanges()
    component.hasSelectedImage(component.editFromGroup.value.imageQuery)
    expect(component.hasSelectedImage).toHaveBeenCalledTimes(1)
    expect(component.availableImages).toEqual([])
  })
})
