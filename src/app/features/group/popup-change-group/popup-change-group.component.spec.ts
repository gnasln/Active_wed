import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangeGroupComponent } from './popup-change-group.component';

describe('PopupChangeGroupComponent', () => {
  let component: PopupChangeGroupComponent;
  let fixture: ComponentFixture<PopupChangeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupChangeGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChangeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
