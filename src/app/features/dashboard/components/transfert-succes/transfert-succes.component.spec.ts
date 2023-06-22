import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertSuccesComponent } from './transfert-succes.component';

describe('TransfertSuccesComponent', () => {
  let component: TransfertSuccesComponent;
  let fixture: ComponentFixture<TransfertSuccesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertSuccesComponent]
    });
    fixture = TestBed.createComponent(TransfertSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
