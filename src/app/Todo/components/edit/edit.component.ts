import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { Todo } from '../../Interfaces/Todo.interface';
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { PhotosReponse } from '../../Interfaces/photos-response.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  activeTodo!: Todo;
  editFromGroup!: FormGroup;
  index: string = '';
  availableImages: string[] = []
  todoImage: string = ''

  constructor(private snackBar: MatSnackBar, private imageService: ImageService, private activeRoute: ActivatedRoute, private router: Router, private storageService: LocalstorageService) {
    this.index = this.activeRoute.snapshot.paramMap.get('id') ?? ''

  }

  ngOnInit(): void {
    //Sends user back to '/' if edit page doesnt exist
    try{
      this.storageService.getOneTodo(+this.index)
      if(+this.index>=0){
        this.activeTodo = this.storageService.getOneTodo(+this.index)
        this.todoImage = this.activeTodo.todoImage
      }
    }catch(error){
      this.router.navigate(['/'])
    }

    this.editFromGroup = new FormGroup({
      'todoName': new FormControl(this.activeTodo.todoName, Validators.required),
      'todoType': new FormControl(this.activeTodo.todoType, Validators.required),
      'todoImage': new FormControl(this.activeTodo.todoImage, Validators.required),
      'imageQuery': new FormControl('')
    })
  }

  //Submits edited todo
  onSubmit(){
    if(this.editFromGroup.status !="INVALID"){
      const updatedTodo = this.editFromGroup.value
      this.storageService.updateTodo(updatedTodo, +this.index);
      this.router.navigateByUrl('/')
    }else{
      this.snackBar.open("Invalid form", 'Close')
    }
  }

  //Deletes todo from edit page
  onDelete(){
    this.storageService.deleteTodo(+this.index)
    this.router.navigateByUrl('/')
  }

  //Searches for images after query input
  onSearch(){
    this.imageService.fetchImages(this.editFromGroup.value.imageQuery).subscribe({
      next: value =>{
        if(value.total_results == 0){
          this.snackBar.open('No images were found', 'Close');
        }
        value.photos.forEach((photo: PhotosReponse)=>{
          this.availableImages.push(photo.src.tiny)
        })
     },
     error: error =>{
      console.log(error)
      this.snackBar.open(error.error.code, 'Close')
     }
    });
  }

  //Updates UI after user chose an image
  hasSelectedImage(image: string){
    this.editFromGroup.value.todoImage = image
    this.todoImage = this.editFromGroup.value.todoImage
    this.availableImages = []
  }
}
