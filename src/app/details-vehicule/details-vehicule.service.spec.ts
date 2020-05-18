import { TestBed } from '@angular/core/testing';

import { DetailsVehiculeService } from './details-vehicule.service';

describe('DetailsVehiculeService', () => {
  let service: DetailsVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
