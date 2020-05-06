import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VosReservationsComponent } from './vos-reservations.component';

describe('VosReservationsComponent', () => {
  let component: VosReservationsComponent;
  let fixture: ComponentFixture<VosReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VosReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VosReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
