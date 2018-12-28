import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthRecoveryComponent } from './month-recovery.component';

describe('MonthRecoveryComponent', () => {
  let component: MonthRecoveryComponent;
  let fixture: ComponentFixture<MonthRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
