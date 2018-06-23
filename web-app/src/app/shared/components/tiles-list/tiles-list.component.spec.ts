/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TilesListComponent } from './tiles-list.component';

describe('TilesListComponent', () => {
  let component: TilesListComponent;
  let fixture: ComponentFixture<TilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TilesListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
