import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTaskComponent } from './featured-task.component';

describe('FeaturedTaskComponent', () => {
  let component: FeaturedTaskComponent;
  let fixture: ComponentFixture<FeaturedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
