import { TestBed } from '@angular/core/testing';

import { PostReservationService } from './post-reservation.service';

describe('PostReservationService', () => {
  let service: PostReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
