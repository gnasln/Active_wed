import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEditTaskComponent } from './popup-add-edit-task.component';

describe('PopupAddEditTaskComponent', () => {
  let component: PopupAddEditTaskComponent;
  let fixture: ComponentFixture<PopupAddEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddEditTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
