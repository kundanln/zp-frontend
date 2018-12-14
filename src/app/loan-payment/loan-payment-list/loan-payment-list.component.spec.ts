import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaymentListComponent } from './loan-payment-list.component';

describe('LoanPaymentListComponent', () => {
  let component: LoanPaymentListComponent;
  let fixture: ComponentFixture<LoanPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
