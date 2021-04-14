import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const input = fixture.debugElement.nativeElement.querySelector('ngx-monaco-editor');
    expect(input).toBeTruthy();
  });

});
