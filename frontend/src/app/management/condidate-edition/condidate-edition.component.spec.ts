import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidateEditionComponent } from './condidate-edition.component';

describe('CondidateEditionComponent', () => {
  let component: CondidateEditionComponent;
  let fixture: ComponentFixture<CondidateEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondidateEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondidateEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
