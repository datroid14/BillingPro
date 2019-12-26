import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceDetailComponent } from './add-maintenance-detail.component';

describe('AddMaintenanceDetailComponent', () => {
  let component: AddMaintenanceDetailComponent;
  let fixture: ComponentFixture<AddMaintenanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaintenanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaintenanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
