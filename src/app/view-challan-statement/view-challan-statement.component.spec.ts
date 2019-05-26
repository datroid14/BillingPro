import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChallanStatementComponent } from './view-challan-statement.component';

describe('ViewChallanStatementComponent', () => {
  let component: ViewChallanStatementComponent;
  let fixture: ComponentFixture<ViewChallanStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChallanStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChallanStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
