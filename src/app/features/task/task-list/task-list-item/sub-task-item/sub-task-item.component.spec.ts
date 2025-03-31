import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskItemComponent } from './sub-task-item.component';

describe('SubTaskItemComponent', () => {
  let component: SubTaskItemComponent;
  let fixture: ComponentFixture<SubTaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTaskItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
