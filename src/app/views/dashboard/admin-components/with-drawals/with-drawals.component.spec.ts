/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WithDrawalsComponent } from './with-drawals.component';

describe('WithDrawalsComponent', () => {
  let component: WithDrawalsComponent;
  let fixture: ComponentFixture<WithDrawalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithDrawalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithDrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
