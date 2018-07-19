import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequeDetailsComponent } from './view-cheque-details.component';

describe('ViewChequeDetailsComponent', () => {
  let component: ViewChequeDetailsComponent;
  let fixture: ComponentFixture<ViewChequeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChequeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChequeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
