/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailSentScreenComponent } from './email-sent-screen.component';

describe('EmailSentScreenComponent', () => {
  let component: EmailSentScreenComponent;
  let fixture: ComponentFixture<EmailSentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
