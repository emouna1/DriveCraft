import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEditionComponent } from './maintenance-edition.component';

describe('MaintenanceEditionComponent', () => {
  let component: MaintenanceEditionComponent;
  let fixture: ComponentFixture<MaintenanceEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
