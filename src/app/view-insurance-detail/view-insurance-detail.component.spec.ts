import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceDetailComponent } from './view-insurance-detail.component';

describe('ViewInsuranceDetailComponent', () => {
  let component: ViewInsuranceDetailComponent;
  let fixture: ComponentFixture<ViewInsuranceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInsuranceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
