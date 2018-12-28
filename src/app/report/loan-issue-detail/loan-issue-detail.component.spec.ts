import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanIssueDetailComponent } from './loan-issue-detail.component';

describe('LoanIssueDetailComponent', () => {
  let component: LoanIssueDetailComponent;
  let fixture: ComponentFixture<LoanIssueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanIssueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanIssueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
