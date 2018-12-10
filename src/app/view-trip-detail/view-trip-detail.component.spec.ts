import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripDetailComponent } from './view-trip-detail.component';

describe('ViewTripDetailComponent', () => {
  let component: ViewTripDetailComponent;
  let fixture: ComponentFixture<ViewTripDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTripDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTripDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
