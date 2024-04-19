import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductEnrollmentComponent } from './conduct-enrollment.component';

describe('ConductEnrollmentComponent', () => {
  let component: ConductEnrollmentComponent;
  let fixture: ComponentFixture<ConductEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductEnrollmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
