import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtodoComponent } from './addtodo.component';
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
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
  let mockFormGroupDirective: FormGroupDirective;
  let localStorage: LocalstorageService;
  let httpTestingController: HttpTestingController;
  let testTodo: TodoModel;

  let mockFormData = {
    name: "Test name",
    type: "Test type",
    imageFormGroup: {
      image: "Test-image"
    }
  }

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
    expect(component.todoFormGroup).not.toBeUndefined()
    expect(component.todoFormGroup).toBeInstanceOf(FormGroup)
  });

  it('form should be invalid when empty', (): void => {
    expect(component.todoFormGroup.status).toEqual("INVALID");
  });

  it('form should be valid when filled', (): void => {
    component.todoFormGroup.setValue(mockFormData)

    expect(component.todoFormGroup.status).toEqual("VALID")

    component.todoFormGroup.get('name')?.setValue('12');
    expect(component.todoFormGroup.status).toBe("INVALID")
  });

  // Unit test for onSubmit method
  it('should process valid forms and call resetForm', (): void => {
    const localStorageCount: number = localStorage.getTodos().length;
    // Fill form
    component.todoFormGroup.setValue(mockFormData)
    component.hasSelected = true;

    spyOn(component.changeTab, 'emit');

    expect(component.todoFormGroup.status).toBe("VALID")
    component.onSubmit(mockFormGroupDirective);

    expect(mockFormGroupDirective.resetForm).toHaveBeenCalledTimes(1);
    expect(component.changeTab.emit).toHaveBeenCalledWith(0);
  });

  it('should check behaviour if form is invalid', (): void => {
    component.todoFormGroup.setValue(mockFormData)
    component.todoFormGroup.get('name')?.setValue('12');
    component.hasSelected = false;

    component.onSubmit(mockFormGroupDirective);

    expect(component.todoFormGroup.status).toBe("INVALID")
    expect(mockFormGroupDirective.resetForm).toHaveBeenCalledTimes(0);
  });

  it('should store fetched data in availableImages array on form submission', (): void => {
    const mockResponse = {
      total_results: 2,
      photos: [
        { src: { tiny: 'url1' }, alt: 'image 1' },
        { src: { tiny: 'url2' }, alt: 'Image 2' },
      ],
    };

    component.todoFormGroup.setValue(mockFormData)

    component.onSubmitImage();
    const req: TestRequest = httpTestingController.expectOne(
      'https://api.pexels.com/v1/search?query=$Test-image&per_page=9'
    );
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

    expect(component.hasSelected).toBe(true);
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
