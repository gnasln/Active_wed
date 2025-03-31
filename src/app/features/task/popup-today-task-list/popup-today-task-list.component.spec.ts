import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTodayTaskListComponent } from './popup-today-task-list.component';

describe('PopupTodayTaskListComponent', () => {
  let component: PopupTodayTaskListComponent;
  let fixture: ComponentFixture<PopupTodayTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupTodayTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupTodayTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
