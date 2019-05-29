/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToActionComponent } from './to-action.component';

describe('ToActionComponent', () => {
  let component: ToActionComponent;
  let fixture: ComponentFixture<ToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
