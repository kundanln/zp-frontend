import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBalanceComponent } from './loan-balance.component';

describe('LoanBalanceComponent', () => {
  let component: LoanBalanceComponent;
  let fixture: ComponentFixture<LoanBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
