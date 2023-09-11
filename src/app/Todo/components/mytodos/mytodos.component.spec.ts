import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytodosComponent } from './mytodos.component';

describe('MytodosComponent', () => {
  let component: MytodosComponent;
  let fixture: ComponentFixture<MytodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
