import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultItemSumaryComponent } from './key-result-item-sumary.component';

describe('KeyResultItemSumaryComponent', () => {
  let component: KeyResultItemSumaryComponent;
  let fixture: ComponentFixture<KeyResultItemSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyResultItemSumaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyResultItemSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
