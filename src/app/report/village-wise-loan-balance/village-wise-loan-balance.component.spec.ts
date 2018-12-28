import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageWiseLoanBalanceComponent } from './village-wise-loan-balance.component';

describe('VillageWiseLoanBalanceComponent', () => {
  let component: VillageWiseLoanBalanceComponent;
  let fixture: ComponentFixture<VillageWiseLoanBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageWiseLoanBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageWiseLoanBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
