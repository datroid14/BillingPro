import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsuranceDetailComponent } from './add-insurance-detail.component';

describe('AddInsuranceDetailsComponent', () => {
  let component: AddInsuranceDetailComponent;
  let fixture: ComponentFixture<AddInsuranceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsuranceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
