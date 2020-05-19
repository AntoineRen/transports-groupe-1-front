import { TestBed } from '@angular/core/testing';

import { LesChauffeursService } from './les-chauffeurs.service';

describe('LesChauffeursService', () => {
  let service: LesChauffeursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LesChauffeursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
