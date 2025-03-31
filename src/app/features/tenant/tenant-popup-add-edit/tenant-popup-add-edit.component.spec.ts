import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPopupAddEditComponent } from './tenant-popup-add-edit.component';

describe('TenantPopupAddEditComponent', () => {
  let component: TenantPopupAddEditComponent;
  let fixture: ComponentFixture<TenantPopupAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantPopupAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenantPopupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
