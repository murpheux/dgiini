import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedVendorComponent } from './featured-vendor.component';

describe('FeaturedVendorComponent', () => {
  let component: FeaturedVendorComponent;
  let fixture: ComponentFixture<FeaturedVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
