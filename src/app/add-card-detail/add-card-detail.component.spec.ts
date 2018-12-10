import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDetailComponent } from './add-card-detail.component';

describe('AddCardDetailComponent', () => {
  let component: AddCardDetailComponent;
  let fixture: ComponentFixture<AddCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
