/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MoodMessageComponent } from './mood-message.component';

describe('MoodMessageComponent', () => {
  let component: MoodMessageComponent;
  let fixture: ComponentFixture<MoodMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoodMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
