import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceCopyComponent } from './view-invoice-copy.component';

describe('ViewInvoiceCopyComponent', () => {
  let component: ViewInvoiceCopyComponent;
  let fixture: ComponentFixture<ViewInvoiceCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvoiceCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvoiceCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
