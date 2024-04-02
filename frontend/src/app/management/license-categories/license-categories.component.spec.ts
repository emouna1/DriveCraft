import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCategoriesComponent } from './license-categories.component';

describe('LicenseCategoriesComponent', () => {
  let component: LicenseCategoriesComponent;
  let fixture: ComponentFixture<LicenseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
