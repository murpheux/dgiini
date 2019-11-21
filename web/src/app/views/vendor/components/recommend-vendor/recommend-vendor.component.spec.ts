import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendVendorComponent } from './recommend-vendor.component';

describe('RecommendVendorComponent', () => {
  let component: RecommendVendorComponent;
  let fixture: ComponentFixture<RecommendVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
