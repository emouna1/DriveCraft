import { TestBed } from '@angular/core/testing';

import { CoondidateService } from './coondidate.service';

describe('CoondidateService', () => {
  let service: CoondidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoondidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
