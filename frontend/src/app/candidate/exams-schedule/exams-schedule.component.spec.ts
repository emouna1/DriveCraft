import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsScheduleComponent } from './exams-schedule.component';

describe('ExamsScheduleComponent', () => {
  let component: ExamsScheduleComponent;
  let fixture: ComponentFixture<ExamsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
