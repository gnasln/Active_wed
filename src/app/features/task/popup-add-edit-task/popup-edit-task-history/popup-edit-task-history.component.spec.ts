import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditTaskHistoryComponent } from './popup-edit-task-history.component';

describe('PopupEditTaskHistoryComponent', () => {
  let component: PopupEditTaskHistoryComponent;
  let fixture: ComponentFixture<PopupEditTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEditTaskHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupEditTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
