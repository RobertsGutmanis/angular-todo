import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageService} from "../../services/image.service";
import {PhotosReponse} from "../../Interfaces/photos-response.interface";
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";

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
  searching = false;
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
  onSubmit(){
    if(this.todoFormGroup.status == "INVALID" || !this.hasSelected){
      this.snackBar.open('Invalid todo form', 'Close');
    }
    else{
      const todo: Todo = {todoName: this.todoFormGroup.value.name, todoType: this.todoFormGroup.value.type, todoImage: this.todoFormGroup.value.imageFormGroup.image}
      this.localStorage.storeTodo(todo)
      this.todoFormGroup.reset()
      this.activeImage = ""
    }
  }
  onSubmitImage(){
    this.searching = true
    console.log(this.searching)
    this.imageService.fetchImages(this.todoFormGroup.value.imageFormGroup.image).subscribe({
      next: value => {
        if(value.total_results == 0){
          this.snackBar.open('No images were found', 'Close');
        }
        value.photos.forEach((photo: PhotosReponse)=>{
          this.availableImages.push(photo.src.original)
        })
      },
      error: error=>{
        this.snackBar.open(error, 'Close')
      }
    })
  }
  hasSelectedImage(image: string){
    this.hasSelected = true;
    this.availableImages = []
    this.activeImage = image;
    this.todoFormGroup.value.imageFormGroup.image = image;
  }
  onChangeImage(){
    this.activeImage = ""
  }
}
