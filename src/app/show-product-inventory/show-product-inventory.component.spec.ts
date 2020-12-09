import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductInventoryComponent } from './show-product-inventory.component';

describe('ShowProductInventoryComponent', () => {
  let component: ShowProductInventoryComponent;
  let fixture: ComponentFixture<ShowProductInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
