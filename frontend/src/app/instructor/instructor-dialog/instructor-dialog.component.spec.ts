import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDialogComponent } from './instructor-dialog.component';

describe('InstructorDialogComponent', () => {
  let component: InstructorDialogComponent;
  let fixture: ComponentFixture<InstructorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
