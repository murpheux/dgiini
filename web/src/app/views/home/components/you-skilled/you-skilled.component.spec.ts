import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouSkilledComponent } from './you-skilled.component';

describe('YouSkilledComponent', () => {
  let component: YouSkilledComponent;
  let fixture: ComponentFixture<YouSkilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouSkilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouSkilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
