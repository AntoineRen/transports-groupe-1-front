import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverCovoiturageComponent } from './reserver-covoiturage.component';

describe('ReserverCovoiturageComponent', () => {
  let component: ReserverCovoiturageComponent;
  let fixture: ComponentFixture<ReserverCovoiturageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserverCovoiturageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserverCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
