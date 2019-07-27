/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminViewClientStatComponent } from './admin-view-client-stat.component';

describe('AdminViewClientStatComponent', () => {
  let component: AdminViewClientStatComponent;
  let fixture: ComponentFixture<AdminViewClientStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewClientStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewClientStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
