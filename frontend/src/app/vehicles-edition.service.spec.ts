import { TestBed } from '@angular/core/testing';

import { VehiclesEditionService } from './vehicles-edition.service';

describe('VehiclesEditionService', () => {
  let service: VehiclesEditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesEditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
