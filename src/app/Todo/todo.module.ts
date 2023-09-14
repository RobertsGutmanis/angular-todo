import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {MatTabsModule} from '@angular/material/tabs';
import { AddtodoComponent } from './components/addtodo/addtodo.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from "@angular/common/http";
import { MytodosComponent } from './components/mytodos/mytodos.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditComponent } from './components/edit/edit.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoRoutingModule } from "./todo-routing.module";
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import {ImageService} from "./services/image.service";
import {LocalstorageService} from "./services/localstorage.service";

@NgModule({
  declarations: [
    AddtodoComponent,
     MytodosComponent,
     EditComponent,
     TodosComponent,
     ConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatCheckboxModule, TodoRoutingModule
  ],
  exports: [
    StoreModule,
    MatTabsModule,
    AddtodoComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, TodoRoutingModule,
    ReactiveFormsModule, MatSnackBarModule, MytodosComponent, MatCardModule, MatCheckboxModule, TodosComponent
  ],
  providers: [ImageService, LocalstorageService],
})
export class TodoModule{ }
