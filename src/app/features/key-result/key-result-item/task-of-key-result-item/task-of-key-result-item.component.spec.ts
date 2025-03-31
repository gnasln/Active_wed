import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOfKeyResultItemComponent } from './task-of-key-result-item.component';

describe('TaskOfKeyResultItemComponent', () => {
  let component: TaskOfKeyResultItemComponent;
  let fixture: ComponentFixture<TaskOfKeyResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOfKeyResultItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskOfKeyResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
