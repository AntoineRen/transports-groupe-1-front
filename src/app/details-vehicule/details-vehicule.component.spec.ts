import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVehiculeComponent } from './details-vehicule.component';

describe('DetailsVehiculeComponent', () => {
  let component: DetailsVehiculeComponent;
  let fixture: ComponentFixture<DetailsVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
