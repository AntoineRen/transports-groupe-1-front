import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubAnnonceComponent } from './pub-annonce.component';

describe('PubAnnonceComponent', () => {
  let component: PubAnnonceComponent;
  let fixture: ComponentFixture<PubAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
