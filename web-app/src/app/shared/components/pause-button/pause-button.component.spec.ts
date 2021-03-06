/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PauseButtonComponent } from '@shared/components/pause-button/pause-button.component';

describe('PauseButtonComponent', () => {
  let component: PauseButtonComponent;
  let fixture: ComponentFixture<PauseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PauseButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
