import { TestBed } from '@angular/core/testing';

import { AdvertisersService } from './advertisers.service';

describe('AdvertisersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvertisersService = TestBed.get(AdvertisersService);
    expect(service).toBeTruthy();
  });
});
