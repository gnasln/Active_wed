import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultComponent } from './key-result.component';

describe('KeyResultComponent', () => {
  let component: KeyResultComponent;
  let fixture: ComponentFixture<KeyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
