import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleeComponent } from './schedulee.component';

describe('ScheduleeComponent', () => {
  let component: ScheduleeComponent;
  let fixture: ComponentFixture<ScheduleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
