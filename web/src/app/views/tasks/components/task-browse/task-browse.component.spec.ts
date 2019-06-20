import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBrowseComponent } from './task-browse.component';

describe('TaskBrowseComponent', () => {
  let component: TaskBrowseComponent;
  let fixture: ComponentFixture<TaskBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
