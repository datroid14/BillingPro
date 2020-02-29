import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInventoryComponent } from './show-inventory.component';

describe('ShowInventoryComponent', () => {
  let component: ShowInventoryComponent;
  let fixture: ComponentFixture<ShowInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
