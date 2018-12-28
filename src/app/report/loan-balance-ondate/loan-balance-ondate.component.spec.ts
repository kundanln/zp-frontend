import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBalanceOndateComponent } from './loan-balance-ondate.component';

describe('LoanBalanceOndateComponent', () => {
  let component: LoanBalanceOndateComponent;
  let fixture: ComponentFixture<LoanBalanceOndateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanBalanceOndateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBalanceOndateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
