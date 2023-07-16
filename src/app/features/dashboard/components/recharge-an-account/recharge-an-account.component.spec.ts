import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeAnAccountComponent } from './recharge-an-account.component';

describe('RechargeAnAccountComponent', () => {
  let component: RechargeAnAccountComponent;
  let fixture: ComponentFixture<RechargeAnAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeAnAccountComponent]
    });
    fixture = TestBed.createComponent(RechargeAnAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
