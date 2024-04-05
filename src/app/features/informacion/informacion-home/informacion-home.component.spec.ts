import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionHomeComponent } from './informacion-home.component';

describe('InformacionHomeComponent', () => {
  let component: InformacionHomeComponent;
  let fixture: ComponentFixture<InformacionHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionHomeComponent]
    });
    fixture = TestBed.createComponent(InformacionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
