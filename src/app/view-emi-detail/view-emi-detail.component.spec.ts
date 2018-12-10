import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmiDetailComponent } from './view-emi-detail.component';

describe('ViewEmiDetailComponent', () => {
  let component: ViewEmiDetailComponent;
  let fixture: ComponentFixture<ViewEmiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
