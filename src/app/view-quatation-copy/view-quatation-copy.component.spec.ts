import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuatationCopyComponent } from './view-quatation-copy.component';

describe('ViewQuatationCopyComponent', () => {
  let component: ViewQuatationCopyComponent;
  let fixture: ComponentFixture<ViewQuatationCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuatationCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuatationCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
