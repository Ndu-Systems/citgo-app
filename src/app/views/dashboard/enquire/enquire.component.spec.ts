/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnquireComponent } from './enquire.component';

describe('EnquireComponent', () => {
  let component: EnquireComponent;
  let fixture: ComponentFixture<EnquireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
