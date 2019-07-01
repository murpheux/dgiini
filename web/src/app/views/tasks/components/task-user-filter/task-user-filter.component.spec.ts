import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserFilterComponent } from './task-user-filter.component';

describe('TaskUserFilterComponent', () => {
  let component: TaskUserFilterComponent;
  let fixture: ComponentFixture<TaskUserFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUserFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
