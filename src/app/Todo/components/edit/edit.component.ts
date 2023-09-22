import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from '../../services/localstorage.service';
import {Todo} from '../../Interfaces/Todo.interface';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {PhotosReponse} from '../../Interfaces/photos-response.interface';
import {OptionValueService} from "../../services/option-value.service";
import {ImageResponse} from "../../Interfaces/image-response.interface";
import {ImageAlt} from "../../Interfaces/Image-alt.interface";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  activeTodo!: Todo;
  showModal: boolean = false;
  editFromGroup!: FormGroup;
  index: string = "";
  availableImages: ImageAlt[] = []
  todoImage: string = "";
  todoAlt: string = "";
  optionValues: string[];

  constructor(private snackBar: MatSnackBar,
              private imageService: ImageService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private storageService: LocalstorageService,
              private optionValuesService: OptionValueService) {
    this.index = this.activeRoute.snapshot.paramMap.get("id") ?? ""
    this.optionValues = this.optionValuesService.getOptionValues

  }

  ngOnInit(): void {
    //Sends user back to '/' if edit page doesnt exist
    try {
      if (+this.index >= 0) {
        this.activeTodo = this.storageService.getOneTodo(+this.index)
        this.todoImage = this.activeTodo.todoImage
        this.todoAlt = this.activeTodo.todoAlt

        this.editFromGroup = new FormGroup({
          "todoName": new FormControl(this.activeTodo.todoName, [Validators.required, Validators.minLength(3)]),
          "todoType": new FormControl(this.activeTodo.todoType, Validators.required),
          "todoImage": new FormControl(this.activeTodo.todoImage, Validators.required),
          "imageQuery": new FormControl("")
        });

      }
    } catch (error) {
      this.router.navigate(["/"]).then();
    }
  }

  //Submits edited todo
  onSubmit(): void {
    if (this.editFromGroup.status != "INVALID") {
      this.storageService.updateTodo(this.editFromGroup.value, +this.index);
      this.router.navigate(['/']).then()
    } else {
      this.snackBar.open("Invalid form", "Close")
    }
  }

  //Deletes todo from edit page
  onDelete(): void {
    this.showModal = true;
  };

  closeModal(event: boolean): void {
    this.showModal = event
  };

  //Searches for images after query input
  onSearch(): void {
    this.imageService.fetchImages(this.editFromGroup.value.imageQuery).subscribe({
      next: (value: ImageResponse): void => {

        if (value.total_results === 0) {
          this.snackBar.open("No images were found", "Close");
        }

        value.photos.forEach((photo: PhotosReponse): void => {
          this.availableImages.push({src: photo.src.tiny, alt: photo.alt === "" ? "No alt" : photo.alt});
        });
      },
      error: error => {
        this.snackBar.open(error.error.code, "Close");
      }
    });
  };

  //Updates UI after user chose an image
  hasSelectedImage(image: string, alt: string): void {
    this.editFromGroup.setValue({
      todoName: this.editFromGroup.value.todoName,
      todoType: this.editFromGroup.value.todoType,
      todoImage: image,
      imageQuery: ''
    });
    this.todoImage = this.editFromGroup.value.todoImage;
    this.availableImages = [];
  };
}
