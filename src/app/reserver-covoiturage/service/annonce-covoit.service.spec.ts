import { TestBed } from '@angular/core/testing';

import { AnnonceCovoitService } from './annonce-covoit.service';

describe('GetAnnonceCovoitService', () => {
  let service: AnnonceCovoitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceCovoitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
