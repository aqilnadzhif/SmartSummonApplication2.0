import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPensyarahPage } from './list-pensyarah.page';

describe('ListPensyarahPage', () => {
  let component: ListPensyarahPage;
  let fixture: ComponentFixture<ListPensyarahPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPensyarahPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPensyarahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
