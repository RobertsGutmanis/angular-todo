import {MytodosComponent} from "./mytodos.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent, MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatRipple, MatRippleModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {TodoModule} from "../../todo.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("first test", ()=>{
  let component: MytodosComponent;
  let fixture: ComponentFixture<MytodosComponent>
  let de: DebugElement

  TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule, MatCheckboxModule, MatCardModule, MatCheckboxModule, MatRippleModule, TodoModule, BrowserAnimationsModule],
    providers:[],
    declarations: []
  }).compileComponents()

  beforeEach(async()=>{
    fixture = TestBed.createComponent(MytodosComponent)
    component = fixture.componentInstance;
    de = fixture.debugElement

    fixture.detectChanges()
  })
  it("Should create", ()=>{
    expect(component).toBeTruthy()
  })
})
