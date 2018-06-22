import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGstComponent } from './view-gst.component';

describe('ViewGstComponent', () => {
  let component: ViewGstComponent;
  let fixture: ComponentFixture<ViewGstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
