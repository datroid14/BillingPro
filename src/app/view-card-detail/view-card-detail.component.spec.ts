import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardDetailComponent } from './view-card-detail.component';

describe('ViewCardDetailComponent', () => {
  let component: ViewCardDetailComponent;
  let fixture: ComponentFixture<ViewCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
