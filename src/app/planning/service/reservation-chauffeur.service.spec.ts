import { TestBed } from '@angular/core/testing';

import { ReservationChauffeurService } from './reservation-chauffeur.service';

describe('ReservationChauffeurService', () => {
  let service: ReservationChauffeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationChauffeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
