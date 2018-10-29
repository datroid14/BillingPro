import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentDetailComponent } from './view-payment-detail.component';

describe('ViewPaymentDetailComponent', () => {
  let component: ViewPaymentDetailComponent;
  let fixture: ComponentFixture<ViewPaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaymentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
