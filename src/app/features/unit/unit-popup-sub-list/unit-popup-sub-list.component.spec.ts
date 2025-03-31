import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPopupSubListComponent } from './unit-popup-sub-list.component';

describe('UnitPopupSubListComponent', () => {
  let component: UnitPopupSubListComponent;
  let fixture: ComponentFixture<UnitPopupSubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitPopupSubListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitPopupSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
