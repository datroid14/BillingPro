import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChequeDetailsComponent } from './add-cheque-detail.component';

describe('AddChequeDetailsComponent', () => {
  let component: AddChequeDetailsComponent;
  let fixture: ComponentFixture<AddChequeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChequeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChequeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
