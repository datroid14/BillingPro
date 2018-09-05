import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseCopyComponent } from './view-purchase-copy.component';

describe('ViewPurchaseCopyComponent', () => {
  let component: ViewPurchaseCopyComponent;
  let fixture: ComponentFixture<ViewPurchaseCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
