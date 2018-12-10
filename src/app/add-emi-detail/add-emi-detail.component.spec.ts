import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmiDetailComponent } from './add-emi-detail.component';

describe('AddEmiDetailComponent', () => {
  let component: AddEmiDetailComponent;
  let fixture: ComponentFixture<AddEmiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
