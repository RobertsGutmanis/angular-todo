import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageService} from "../../services/image.service";
import {PhotosReponse} from "../../Interfaces/photos-response.interface";
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";
import {ImageResponse} from "../../Interfaces/image-response.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  todoFormGroup!: FormGroup;
  availableImages: string[] = []
  activeImage: string = ""
  hasSelected = false;
  constructor(private snackBar: MatSnackBar, private imageService: ImageService, private localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.todoFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      imageFormGroup: new FormGroup({
        image: new FormControl('', Validators.required)
      }),
      type: new FormControl('', Validators.required)
    })
  }

  //Submits add todo form
  onSubmit(){
    if(this.todoFormGroup.status == "INVALID" || !this.hasSelected){
      this.snackBar.open('Invalid todo form', 'Close');
    }
    else{
      const todo: Todo = {todoName: this.todoFormGroup.value.name, todoType: this.todoFormGroup.value.type, todoImage: this.todoFormGroup.value.imageFormGroup.image}
      this.localStorage.storeTodo(todo)
      this.activeImage = ""
      this.todoFormGroup.setValue({name: [], imageFormGroup: {image: null}, type: null})
    }
  }
  //Fetches images after user enters search query and clicks search button
  onSubmitImage(){
    this.imageService.fetchImages<ImageResponse>(this.todoFormGroup.value.imageFormGroup.image).subscribe({
      next: (value: ImageResponse)=> {
        if(value.total_results === 0){
          this.snackBar.open('No images were found', 'Close');
        }
        value.photos.forEach((photo: PhotosReponse)=>{
          this.availableImages.push(photo.src.tiny)
        })
      },
      error: (error: HttpErrorResponse)=>{
        this.snackBar.open(error.error.code, 'Close')
      }
    })
  }

  //Updates UI after user chooses an image
  hasSelectedImage(image: string){
    this.hasSelected = true;
    this.availableImages = []
    this.activeImage = image;
    this.todoFormGroup.value.imageFormGroup.image = image;
  }

  //Updates UI after user click change image
  onChangeImage(){
    this.activeImage = ""
  }
  public get hasNoActiveImage(): boolean { return this.activeImage === ""; }
}
