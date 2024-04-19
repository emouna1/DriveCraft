import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsScheduleComponent } from './lessons-schedule.component';

describe('LessonsScheduleComponent', () => {
  let component: LessonsScheduleComponent;
  let fixture: ComponentFixture<LessonsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
