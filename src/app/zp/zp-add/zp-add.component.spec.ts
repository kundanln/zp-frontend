import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpAddComponent } from './zp-add.component';

describe('ZpAddComponent', () => {
  let component: ZpAddComponent;
  let fixture: ComponentFixture<ZpAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
