import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSubTaskListComponent } from './popup-sub-task-list.component';

describe('PopupSubTaskListComponent', () => {
  let component: PopupSubTaskListComponent;
  let fixture: ComponentFixture<PopupSubTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupSubTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupSubTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
