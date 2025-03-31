import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrgnizationPopupComponent } from './change-orgnization-popup.component';

describe('ChangeOrgnizationPopupComponent', () => {
  let component: ChangeOrgnizationPopupComponent;
  let fixture: ComponentFixture<ChangeOrgnizationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeOrgnizationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeOrgnizationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
