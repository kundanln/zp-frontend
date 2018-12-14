import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaymentAddComponent } from './loan-payment-add.component';

describe('LoanPaymentAddComponent', () => {
  let component: LoanPaymentAddComponent;
  let fixture: ComponentFixture<LoanPaymentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPaymentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
