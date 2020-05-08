import { TestBed } from '@angular/core/testing';

import { ListCovoiturageService } from './list-covoiturage.service';

describe('ListCovoiturageService', () => {
  let service: ListCovoiturageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCovoiturageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
