import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuatationComponent } from './view-quatation.component';

describe('ViewQuatationComponent', () => {
  let component: ViewQuatationComponent;
  let fixture: ComponentFixture<ViewQuatationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuatationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
