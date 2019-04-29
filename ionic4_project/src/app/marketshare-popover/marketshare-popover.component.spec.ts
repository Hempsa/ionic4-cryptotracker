import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsharePopoverComponent } from './marketshare-popover.component';

describe('MarketsharePopoverComponent', () => {
  let component: MarketsharePopoverComponent;
  let fixture: ComponentFixture<MarketsharePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketsharePopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsharePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
