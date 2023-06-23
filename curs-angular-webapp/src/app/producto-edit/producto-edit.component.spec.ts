import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditComponent } from './producto-edit.component';

describe('ProductoEditComponent', () => {
  let component: ProductoEditComponent;
  let fixture: ComponentFixture<ProductoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoEditComponent]
    });
    fixture = TestBed.createComponent(ProductoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
