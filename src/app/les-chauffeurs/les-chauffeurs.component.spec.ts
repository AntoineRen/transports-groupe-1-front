import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesChauffeursComponent } from './les-chauffeurs.component';

describe('LesChauffeursComponent', () => {
  let component: LesChauffeursComponent;
  let fixture: ComponentFixture<LesChauffeursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesChauffeursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesChauffeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
