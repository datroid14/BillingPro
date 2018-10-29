import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDieselEntryComponent } from './add-diesel-entry.component';

describe('AddDieselEntryComponent', () => {
  let component: AddDieselEntryComponent;
  let fixture: ComponentFixture<AddDieselEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDieselEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDieselEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
