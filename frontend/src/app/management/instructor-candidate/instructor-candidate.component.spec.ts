import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCandidateComponent } from './instructor-candidate.component';

describe('InstructorCandidateComponent', () => {
  let component: InstructorCandidateComponent;
  let fixture: ComponentFixture<InstructorCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
