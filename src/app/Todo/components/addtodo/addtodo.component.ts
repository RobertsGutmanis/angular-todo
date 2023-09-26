import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../../services/image.service';
import { PhotosReponse } from '../../Interfaces/photos-response.interface';
import { Todo } from '../../Interfaces/Todo.interface';
import { LocalstorageService } from '../../services/localstorage.service';
import { ImageResponse } from '../../Interfaces/image-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { OptionValueService } from '../../services/option-value.service';
import { ImageAlt } from '../../Interfaces/Image-alt.interface';
import {take} from "rxjs";

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css'],
})
export class AddtodoComponent implements OnInit {
  @Output() changeTab: EventEmitter<number> = new EventEmitter();

  todoFormGroup!: FormGroup;
  availableImages: ImageAlt[] = [];
  activeImage: ImageAlt = { src: '', alt: '' };
  hasSelected: boolean = false;
  todo!: Todo;
  optionValues: string[];

  constructor(
    public snackBar: MatSnackBar,
    private imageService: ImageService,
    private localStorage: LocalstorageService,
    private optionValuesService: OptionValueService
  ) {
    this.optionValues = this.optionValuesService.getOptionValues;
  }

  public get hasNoActiveImage(): boolean {
    return this.activeImage.src === '';
  }

  ngOnInit(): void {
    this.todoFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageFormGroup: new FormGroup({
        image: new FormControl('', Validators.required),
      }),
      type: new FormControl('', Validators.required),
    });
  }

  //Submits add todo form
  onSubmit(formDirective: FormGroupDirective): void {
    if (this.todoFormGroup.status == 'INVALID' || !this.hasSelected) {
      this.snackBar.open('Invalid todo form', 'Close');
    } else {
      this.todo = {
        todoName: this.todoFormGroup.value.name,
        todoType: this.todoFormGroup.value.type,
        todoImage: this.todoFormGroup.value.imageFormGroup.image,
        todoAlt: this.activeImage.alt,
      };

      this.localStorage.storeTodo(this.todo);
      this.activeImage.src = '';
      this.activeImage.alt = '';
      this.changeTab.emit(0);
      formDirective.resetForm();
    }
  }

  //Fetches images after user enters search query and clicks search button
  onSubmitImage(): void {
    this.imageService
      .fetchImages(this.todoFormGroup.value.imageFormGroup.image)
      .pipe(take(1))
      .subscribe({
        next: (value: ImageResponse): void => {
          if (value.total_results === 0) {
            this.snackBar.open('No images were found', 'Close');
          }

          value.photos.forEach((photo: PhotosReponse): void => {
            this.availableImages.push({ src: photo.src.tiny, alt: photo.alt });
          });
        },
        error: (error: HttpErrorResponse): void => {
          this.snackBar.open(error.error.code, 'Close');
        },
      });
  }

  //Updates UI after user chooses an image
  hasSelectedImage(image: string, alt: string): void {
    this.hasSelected = true;
    this.availableImages = [];
    this.activeImage = { src: image, alt: alt === '' ? 'No alt' : alt };
    this.todoFormGroup.value.imageFormGroup.image = image;
  }

  //Updates UI after user click change image
  onChangeImage(): void {
    this.activeImage.src = '';
    this.activeImage.alt = '';
    this.hasSelected = false;
  }
}
