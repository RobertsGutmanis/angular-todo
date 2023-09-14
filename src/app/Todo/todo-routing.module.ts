import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
    {path: '', component: TodosComponent},
    {path: 'edit/:id', component: EditComponent}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TodoRoutingModule { }
