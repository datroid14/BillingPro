import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChallanComponent } from './view-challan.component';

describe('ViewChalanComponent', () => {
  let component: ViewChallanComponent;
  let fixture: ComponentFixture<ViewChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
