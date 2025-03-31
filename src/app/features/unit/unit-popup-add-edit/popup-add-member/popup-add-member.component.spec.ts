import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddMemberComponent } from './popup-add-member.component';

describe('PopupAddMemberComponent', () => {
  let component: PopupAddMemberComponent;
  let fixture: ComponentFixture<PopupAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
