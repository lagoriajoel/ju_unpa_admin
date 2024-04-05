import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesHomeComponent } from './ubicaciones-home.component';

describe('UbicacionesHomeComponent', () => {
  let component: UbicacionesHomeComponent;
  let fixture: ComponentFixture<UbicacionesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionesHomeComponent]
    });
    fixture = TestBed.createComponent(UbicacionesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
