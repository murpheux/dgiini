import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorclientComponent } from './vendorclient.component';

describe('VendorclientComponent', () => {
  let component: VendorclientComponent;
  let fixture: ComponentFixture<VendorclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
