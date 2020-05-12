import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverVehiculeSocieteComponent } from './reserver-vehicule-societe.component';

describe('ReserverVehiculeSocieteComponent', () => {
  let component: ReserverVehiculeSocieteComponent;
  let fixture: ComponentFixture<ReserverVehiculeSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserverVehiculeSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserverVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
