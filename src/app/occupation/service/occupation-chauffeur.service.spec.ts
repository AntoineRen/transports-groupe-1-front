import { TestBed } from '@angular/core/testing';

import { OccupationChauffeurService } from './occupation-chauffeur.service';

describe('OccupationChauffeurService', () => {
  let service: OccupationChauffeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationChauffeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
