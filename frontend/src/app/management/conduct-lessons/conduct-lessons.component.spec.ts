import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductLessonsComponent } from './conduct-lessons.component';

describe('ConductLessonsComponent', () => {
  let component: ConductLessonsComponent;
  let fixture: ComponentFixture<ConductLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
