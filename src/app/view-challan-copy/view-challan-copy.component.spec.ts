import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChallanCopyComponent } from './view-challan-copy.component';

describe('ViewChallanCopyComponent', () => {
  let component: ViewChallanCopyComponent;
  let fixture: ComponentFixture<ViewChallanCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChallanCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChallanCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
