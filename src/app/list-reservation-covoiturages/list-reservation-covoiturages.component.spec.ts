import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationCovoituragesComponent } from './list-reservation-covoiturages.component';

describe('ListReservationCovoituragesComponent', () => {
  let component: ListReservationCovoituragesComponent;
  let fixture: ComponentFixture<ListReservationCovoituragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservationCovoituragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationCovoituragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
