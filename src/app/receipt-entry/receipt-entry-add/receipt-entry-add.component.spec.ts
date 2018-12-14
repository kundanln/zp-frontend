import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptEntryAddComponent } from './receipt-entry-add.component';

describe('ReceiptEntryAddComponent', () => {
  let component: ReceiptEntryAddComponent;
  let fixture: ComponentFixture<ReceiptEntryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptEntryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptEntryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
