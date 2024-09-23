import { TestBed } from '@angular/core/testing';

import { InstructorCandidateService } from './instructor-candidate.service';

describe('InstructorCandidateService', () => {
  let service: InstructorCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
