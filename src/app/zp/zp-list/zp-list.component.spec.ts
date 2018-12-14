import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpListComponent } from './zp-list.component';

describe('ZpListComponent', () => {
  let component: ZpListComponent;
  let fixture: ComponentFixture<ZpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
