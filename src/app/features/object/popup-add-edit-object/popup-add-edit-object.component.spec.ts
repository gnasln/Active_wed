import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEditObjectComponent } from './popup-add-edit-object.component';

describe('PopupAddEditObjectComponent', () => {
  let component: PopupAddEditObjectComponent;
  let fixture: ComponentFixture<PopupAddEditObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddEditObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddEditObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
