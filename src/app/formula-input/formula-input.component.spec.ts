import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';
import { Formula, Store } from './formula';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  const formulas: Store<Formula> = {
    ids: ['SUM', 'SUMO', 'SOM', 'PROD'],
    item: {
      ['SUM']: { name: 'SUM', description: 'SUM details', syntax: 'syntax SUM', shortDescription: 'short Sum details' },
      ['SUMO']: { name: 'SUMO', description: 'SUMO details', syntax: '' },
      ['PROD']: { name: 'PROD', description: 'PROD details', syntax: '' },
      ['SOM']: { name: 'SOM', description: 'SOM details', syntax: '' },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formulas = formulas;
  }));

  it('should create', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    expect(input).toBeTruthy();
  });

  it('should display nothing when the user write something', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.dispatchEvent(new Event('input'));
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeFalsy();
  });

  it('should display 3 suggestions if the first letter match with formulas', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(1);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'S';
    fixture.detectChanges();
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(3);
  });

  it('the formula matching is case sensitive', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 's';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeFalsy();
  });

  it('should filter the formula suggestions', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(2);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SO';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(1);
  });

  it('should suggest a formula after a formula', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(6);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SUM(SO';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(1);
  });

  it('should suggest a formula after an operator', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(5);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = '3 + S';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(3);
  });

  it('should display the details of a formula after a bracket and not the suggestions', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(4);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SUM(';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const suggestions = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(suggestions).toBeFalsy();
    const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
    expect(details).toBeTruthy();
    expect(details.innerHTML.trim()).toContain(formulas.item['SUM'].syntax);
  });
});
