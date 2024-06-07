import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductExamsComponent } from './conduct-exams.component';

describe('ConductExamsComponent', () => {
  let component: ConductExamsComponent;
  let fixture: ComponentFixture<ConductExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
