import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUbicacionesComponent } from './add-ubicaciones.component';

describe('AddUbicacionesComponent', () => {
  let component: AddUbicacionesComponent;
  let fixture: ComponentFixture<AddUbicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUbicacionesComponent]
    });
    fixture = TestBed.createComponent(AddUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
