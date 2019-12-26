import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceDetailComponent } from './view-maintenance-detail.component';

describe('ViewMaintenanceDetailComponent', () => {
  let component: ViewMaintenanceDetailComponent;
  let fixture: ComponentFixture<ViewMaintenanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMaintenanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMaintenanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
