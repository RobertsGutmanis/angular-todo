import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtodoComponent } from './addtodo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoModule } from '../../todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalstorageService } from '../../services/localstorage.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoModel } from '../../Models/Todo.model';

describe('AddtodoComponent', (): void => {
  let component: AddtodoComponent;
  let fixture: ComponentFixture<AddtodoComponent>;
  let mockFormGroupDirective: any;
  let localStorage: LocalstorageService;
  let httpTestingController: HttpTestingController;
  let testTodo: TodoModel;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AddtodoComponent],
      imports: [
        ReactiveFormsModule,
        TodoModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [LocalstorageService],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AddtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    mockFormGroupDirective = jasmine.createSpyObj('FormGroupDirective', [
      'resetForm',
    ]);
    localStorage = TestBed.inject(LocalstorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
    testTodo = new TodoModel('test todo', 'type1', 'http://url.png', 'alt');
    localStorage.storeTodo(testTodo.getTodo);
  });

  it('should create form on ngOnInit', (): void => {
    expect(component.todoFormGroup).toBeTruthy();
    expect(component.todoFormGroup.get('name')).toBeTruthy();
    expect(component.todoFormGroup.get('imageFormGroup')).toBeTruthy();
    expect(component.todoFormGroup.get('type')).toBeTruthy();
  });

  it('form should be invalid when empty', (): void => {
    expect(component.todoFormGroup.valid).toBeFalsy();
  });

  it('form should be valid when filled', (): void => {
    component.todoFormGroup.get('name')?.setValue('Test Name');
    component.todoFormGroup
      .get('imageFormGroup')
      ?.get('image')
      ?.setValue('Test Image');
    component.todoFormGroup.get('type')?.setValue('Test Type');
    expect(component.todoFormGroup.valid).toBeTruthy();

    component.todoFormGroup.get('name')?.setValue('12');
    expect(component.todoFormGroup.valid).toBeFalsy();
  });

  // Unit test for onSubmit method
  it('should process valid forms and call resetForm', (): void => {
    const localStorageCount: number = localStorage.getTodos().length;
    // Fill form
    component.todoFormGroup.get('name')?.setValue('Test Name');
    component.todoFormGroup
      .get('imageFormGroup')
      ?.get('image')
      ?.setValue('Test Image');
    component.todoFormGroup.get('type')?.setValue('Test Type');
    component.hasSelected = true;

    spyOn(localStorage, 'storeTodo').and.callThrough();
    spyOn(component.changeTab, 'emit');

    component.onSubmit(mockFormGroupDirective);

    expect(localStorage.storeTodo).toHaveBeenCalledTimes(1);
    expect(mockFormGroupDirective.resetForm).toHaveBeenCalledTimes(1);
    expect(component.changeTab.emit).toHaveBeenCalledWith(0);
    expect(localStorage.getTodos().length).toEqual(localStorageCount + 1);
  });

  it('should check behaviour if form is invalid', (): void => {
    component.todoFormGroup.get('name')?.setValue('12');
    component.todoFormGroup
      .get('imageFormGroup')
      ?.get('image')
      ?.setValue('Test Image');
    component.todoFormGroup.get('type')?.setValue('Test Type');
    component.hasSelected = false;

    spyOn(localStorage, 'storeTodo');
    component.onSubmit(mockFormGroupDirective);

    expect(component.todoFormGroup.valid).toBeFalsy();
    expect(localStorage.storeTodo).toHaveBeenCalledTimes(0);
    expect(mockFormGroupDirective.resetForm).toHaveBeenCalledTimes(0);
  });

  it('should fetch images successfully on form submission', (): void => {
    const mockResponse = {
      total_results: 2,
      photos: [
        { src: { tiny: 'url1' }, alt: 'image 1' },
        { src: { tiny: 'url2' }, alt: 'Image 2' },
      ],
    };

    component.todoFormGroup
      .get('imageFormGroup')
      ?.get('image')
      ?.setValue('test-image');
    component.onSubmitImage();
    const req: TestRequest = httpTestingController.expectOne(
      'https://api.pexels.com/v1/search?query=$test-image&per_page=9'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
    expect(component.availableImages.length).toBe(2);
  });

  it('should handle error during image fetching', (): void => {
    spyOn(component.snackBar, 'open');
    component.onSubmitImage();

    const req: TestRequest = httpTestingController.expectOne(
      'https://api.pexels.com/v1/search?query=$&per_page=9'
    );
    req.error(new ProgressEvent('error'));
    expect(component.snackBar.open).toHaveBeenCalled();
  });

  it('should update UI after user chooses an image', (): void => {
    const image: string = 'test.png';
    const alt: string = 'alt';

    component.hasSelectedImage(image, alt);

    expect(component.hasSelected).toBeTruthy();
    expect(component.availableImages.length).toBe(0);
    expect(component.activeImage).toEqual({ src: image, alt: alt });
    expect(component.todoFormGroup.value.imageFormGroup.image).toBe(image);
  });

  it('should reset activeImage and hasSelected', () => {
    component.onChangeImage();
    expect(component.activeImage).toEqual({ src: '', alt: '' });
    expect(component.hasSelected).toBeFalse();
  });
});
