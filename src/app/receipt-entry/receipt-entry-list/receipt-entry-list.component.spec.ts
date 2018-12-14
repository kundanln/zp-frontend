import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptEntryListComponent } from './receipt-entry-list.component';

describe('ReceiptEntryListComponent', () => {
  let component: ReceiptEntryListComponent;
  let fixture: ComponentFixture<ReceiptEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
