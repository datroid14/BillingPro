import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripDetailComponent } from './add-trip-detail.component';

describe('AddTripDetailComponent', () => {
  let component: AddTripDetailComponent;
  let fixture: ComponentFixture<AddTripDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTripDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
