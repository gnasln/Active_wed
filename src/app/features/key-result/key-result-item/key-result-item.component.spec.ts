import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultItemComponent } from './key-result-item.component';

describe('KeyResultItemComponent', () => {
  let component: KeyResultItemComponent;
  let fixture: ComponentFixture<KeyResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyResultItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
