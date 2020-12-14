import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentDueComponent } from './show-payment-due.component';

describe('ShowPaymentDueComponent', () => {
  let component: ShowPaymentDueComponent;
  let fixture: ComponentFixture<ShowPaymentDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPaymentDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPaymentDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
