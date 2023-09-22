import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Router } from '@angular/router';
import { TodoModule } from '../../todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalstorageService } from '../../services/localstorage.service';
import { EditComponent } from './edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ImageService} from "../../services/image.service";
import {HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { of } from 'rxjs';
import {ImageResponse} from "../../Interfaces/image-response.interface";
import {mockData} from "../../../../Mocks/mock-api-data";

describe('Tests confirm delete modal', (): void => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let router: Router;
  let storageService: LocalstorageService;
  let imageService: ImageService;
  let httpMock: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      imports: [
        TodoModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [LocalstorageService, LocalstorageService, ImageService, HttpTestingController],
    });

    fixture = TestBed.createComponent(EditComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    storageService = TestBed.inject(LocalstorageService);
    imageService = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController)

    localStorage.setItem(
      'todos',
      JSON.stringify([
        { todoName: 'todo', todoType: 'type1', todoImage: 'http:image.png', todoAlt: "alt" },
      ])
    );
    component.index = '0';
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should test ngOnInit', (): void=>{
    expect(component.activeTodo).toEqual(storageService.getOneTodo(0))
    expect(component.todoImage).toEqual('http:image.png')
    expect(component.todoAlt).toEqual('alt')
    expect(component.editFromGroup).toBeTruthy()
  })

  it('should redirect to / if todo doesnt exist', (): void=>{
    const router: Router = TestBed.inject(Router)
    spyOn(router, 'navigate');
    component.index = '404';
    component.ngOnInit()
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  })

  it('Should test onSubmit if form is valid', (): void=>{
    const router: Router = TestBed.inject(Router)
    spyOn(router, 'navigate');
      component.editFromGroup.setValue({todoName: 'updatedTodo', todoType: 'type2', todoImage: 'newimage', imageQuery: '' })
      component.onSubmit()
      expect(storageService.getOneTodo(0).todoName).toEqual("updatedTodo")
      expect(storageService.getOneTodo(0).todoType).toEqual("type2")
      expect(storageService.getOneTodo(0).todoImage).toEqual("newimage")
      expect(router.navigate).toHaveBeenCalledWith(['/']);
  })
  it('Should test onSubmit if form is invalid', ()=>{
      spyOn(component.snackBar, 'open');
      component.editFromGroup.setValue({todoName: '12', todoType: 'type1', todoImage: 'imgurl', imageQuery: '' })
      component.onSubmit()
      expect(component.editFromGroup.status).toEqual("INVALID")
      expect(component.snackBar.open).toHaveBeenCalledWith('Invalid form', 'Close')
  })

  it("should toggle delete modal on delete button click", ()=>{
    fixture.nativeElement.querySelector('.delete-button').click()
    expect(component.showModal).toBeTruthy()
  })

  it("should test onSearch method", (): void=>{
    component.editFromGroup.value.imageQuery = 'cat'
    const response: ImageResponse = mockData
    spyOn(imageService, 'fetchImages').and.returnValue(of(response))
    component.onSearch()
    fixture.detectChanges()
    expect(component.availableImages[0].src).toEqual(response.photos[0].src.tiny)
    expect(component.availableImages[0].alt).toEqual(response.photos[0].alt)
  })

  it('should test hasSelectedImage()', (): void=>{
    component.hasSelectedImage('test.png', 'test image')
    expect(component.editFromGroup.value.todoName).toEqual('todo')
    expect(component.editFromGroup.value.todoType).toEqual('type1')
    expect(component.editFromGroup.value.todoImage).toEqual('test.png')
    expect(component.editFromGroup.value.imageQuery).toEqual('')
    expect(component.todoImage).toEqual('test.png')
    expect(component.availableImages.length).toEqual(0)
  })

});
