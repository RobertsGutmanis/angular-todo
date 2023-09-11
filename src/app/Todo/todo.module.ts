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
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  declarations: [

    AddtodoComponent,
     MytodosComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    MatTabsModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatCheckboxModule, AppRoutingModule
  ],
  exports: [
    StoreModule,
    MatTabsModule,
    AddtodoComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatSnackBarModule, MytodosComponent, MatCardModule, MatCheckboxModule
  ],
  providers: [],
})
export class TodoModule{ }