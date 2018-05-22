import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuatationComponent } from './create-quatation.component';

describe('CreateQuatationComponent', () => {
  let component: CreateQuatationComponent;
  let fixture: ComponentFixture<CreateQuatationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuatationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
