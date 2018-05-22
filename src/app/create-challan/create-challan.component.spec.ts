import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallanComponent } from './create-challan.component';

describe('CreateChallanComponent', () => {
  let component: CreateChallanComponent;
  let fixture: ComponentFixture<CreateChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
