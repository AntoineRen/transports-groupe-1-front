import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverUnVehiculeComponent } from './reserver-un-vehicule.component';

describe('ReserverUnVehiculeComponent', () => {
  let component: ReserverUnVehiculeComponent;
  let fixture: ComponentFixture<ReserverUnVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserverUnVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserverUnVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
