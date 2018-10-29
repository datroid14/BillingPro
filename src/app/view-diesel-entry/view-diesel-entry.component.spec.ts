import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDieselEntryComponent } from './view-diesel-entry.component';

describe('ViewDieselEntryComponent', () => {
  let component: ViewDieselEntryComponent;
  let fixture: ComponentFixture<ViewDieselEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDieselEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDieselEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
