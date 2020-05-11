import { TestBed } from '@angular/core/testing';

import { GetVehiculeService } from './get-vehicule.service';

describe('GetVehiculeService', () => {
  let service: GetVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
