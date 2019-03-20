import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsPage } from './coins.page';

describe('CoinsPage', () => {
  let component: CoinsPage;
  let fixture: ComponentFixture<CoinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
