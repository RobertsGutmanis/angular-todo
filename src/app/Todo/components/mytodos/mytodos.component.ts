import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../Interfaces/Todo.interface";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from '@angular/router';
import {OptionValueService} from "../../services/option-value.service";

@Component({
  selector: 'app-mytodos',
  templateUrl: './mytodos.component.html',
  styleUrls: ['./mytodos.component.css']
})
export class MytodosComponent implements OnInit {
  @Output() toggleModal: EventEmitter<[Todo, number]> = new EventEmitter();
  @Output() changeTabsEmitter: EventEmitter<number> = new EventEmitter();

  myTodos: Todo[] = [];
  filters: string[] = [];
  filteredTodos!: Todo[];
  optionValues: string[];

  constructor(private localStorage: LocalstorageService,
              private router: Router,
              private optionValuesService: OptionValueService) {
    this.optionValues = this.optionValuesService.getOptionValues
  }

  ngOnInit(): void {
    if (localStorage.getItem("todos")) {
      this.myTodos = this.localStorage.getTodos();
    }

    this.localStorage.todoSubject.subscribe({
      next: newTodos => {
        this.myTodos = newTodos;
      }
    });
  };

  // Delete function on delete button click
  onDeleteTodo(index: number) {
    this.toggleModal.emit([this.myTodos[index], index]);
  };

  //Searches for todos on search input
  onSearchTodo(data: any): void {
    this.myTodos = this.localStorage.getTodos();
    this.myTodos = this.myTodos.filter((todo: Todo): void => {
      todo.todoName.includes(data.target.value);
    });
  }

  changeTabs(): void {
    this.changeTabsEmitter.emit(1)
  }

  //Filters todos on checkbox input
  onFilter(type: string): void {
    let indexOfType = this.filters.indexOf(type);

    //Checks if filter is active
    if (indexOfType >= 0) {
      this.filters.splice(indexOfType, 1);
    } else {
      this.filters.push(type);
    }

    //Displays filtered todos
    if (this.filters.length === 0) {
      this.myTodos = this.localStorage.getTodos();
    } else {
      let placeholderArray: Todo[] = [];
      this.filters.forEach((filter: string, index: number): void => {

        let todoArray: Todo[] = this.localStorage.getTodos().filter((todo: Todo): void => {
          todo.todoType.includes(filter);
        })

        placeholderArray.push(...todoArray);

      })
      this.myTodos = placeholderArray;
    }
  };
}
