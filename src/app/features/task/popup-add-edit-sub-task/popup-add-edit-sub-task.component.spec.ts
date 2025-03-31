import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEditSubTaskComponent } from './popup-add-edit-sub-task.component';

describe('PopupAddEditSubTaskComponent', () => {
  let component: PopupAddEditSubTaskComponent;
  let fixture: ComponentFixture<PopupAddEditSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddEditSubTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddEditSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
