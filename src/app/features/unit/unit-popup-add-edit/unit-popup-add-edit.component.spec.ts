import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPopupAddEditComponent } from './unit-popup-add-edit.component';

describe('UnitPopupAddEditComponent', () => {
  let component: UnitPopupAddEditComponent;
  let fixture: ComponentFixture<UnitPopupAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitPopupAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitPopupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
