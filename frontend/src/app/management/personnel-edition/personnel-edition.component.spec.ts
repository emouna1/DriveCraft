import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelEditionComponent } from './personnel-edition.component';

describe('PersonnelEditionComponent', () => {
  let component: PersonnelEditionComponent;
  let fixture: ComponentFixture<PersonnelEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
