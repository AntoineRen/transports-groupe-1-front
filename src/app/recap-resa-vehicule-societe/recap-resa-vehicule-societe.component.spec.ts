import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapResaVehiculeSocieteComponent } from './recap-resa-vehicule-societe.component';

describe('RecapResaVehiculeSocieteComponent', () => {
  let component: RecapResaVehiculeSocieteComponent;
  let fixture: ComponentFixture<RecapResaVehiculeSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapResaVehiculeSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapResaVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
