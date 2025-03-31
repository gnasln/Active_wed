import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPopupAddEditSubComponent } from './unit-popup-add-edit-sub.component';

describe('UnitPopupAddEditSubComponent', () => {
  let component: UnitPopupAddEditSubComponent;
  let fixture: ComponentFixture<UnitPopupAddEditSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitPopupAddEditSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitPopupAddEditSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
