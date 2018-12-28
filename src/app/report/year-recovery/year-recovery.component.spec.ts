import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearRecoveryComponent } from './year-recovery.component';

describe('YearRecoveryComponent', () => {
  let component: YearRecoveryComponent;
  let fixture: ComponentFixture<YearRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
