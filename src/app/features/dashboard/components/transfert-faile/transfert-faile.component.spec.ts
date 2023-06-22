import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertFaileComponent } from './transfert-faile.component';

describe('TransfertFaileComponent', () => {
  let component: TransfertFaileComponent;
  let fixture: ComponentFixture<TransfertFaileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertFaileComponent]
    });
    fixture = TestBed.createComponent(TransfertFaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
