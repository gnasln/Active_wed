import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEditKeyResultComponent } from './popup-add-edit-key-result.component';

describe('PopupAddEditKeyResultComponent', () => {
  let component: PopupAddEditKeyResultComponent;
  let fixture: ComponentFixture<PopupAddEditKeyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddEditKeyResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddEditKeyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
