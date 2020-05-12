import { TestBed } from '@angular/core/testing';

import { GetAnnonceCovoitService } from './get-annonce-covoit.service';

describe('GetAnnonceCovoitService', () => {
  let service: GetAnnonceCovoitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnnonceCovoitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
