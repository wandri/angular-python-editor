import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';
import { Formula, Store } from './formula';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  const formulas: Store<Formula> = {
    ids: ['PROD', 'SOM', 'SUM', 'SUMO'],
    item: {
      ['SUM']: { name: 'SUM', description: 'SUM details', syntax: 'syntax SUM', shortDescription: 'short Sum details' },
      ['SOM']: { name: 'SOM', description: 'SOM details', syntax: '', shortDescription: 'short Som details' },
      ['SUMO']: { name: 'SUMO', description: 'SUMO details', syntax: '' },
      ['PROD']: { name: 'PROD', description: 'PROD details', syntax: '' },
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

  it('should enter the suggestion on click', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(2);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SU';
    fixture.detectChanges();
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    (suggestions.item(1) as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(input.innerHTML).toEqual('SUMO(');
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

  it('should display the full description of a formula after a bracket and not the suggestions', () => {
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

  describe('focus suggestion', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      spyOn(component, 'getCaretIndex').and.returnValue(4);
      input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    });

    it('should active the first suggestion and display its short description', () => {
      input.innerHTML = 'S';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
      expect(details).toBeTruthy();
    });

    it('should display the short description', () => {
      input.innerHTML = 'S';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
      expect(details.innerHTML.trim()).toEqual(formulas.item['SOM'].shortDescription);
    });

    it('should use the description if the short description is not provided', () => {
      input.innerHTML = 'PROD';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
      expect(details.innerHTML.trim()).toEqual(formulas.item['PROD'].description);
    });

    it('should focus the next suggestion with ArrowDown', () => {
      input.innerHTML = 'S';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      const details = fixture.debugElement.nativeElement.querySelector('.active .suggestion-short-description');
      const shortDescription = formulas.item['SUM'].shortDescription;
      expect(details.innerHTML.trim()).toEqual(shortDescription);
      console.log(shortDescription);
    });

    it('should focus the previous suggestion with ArrowUp', () => {
      input.innerHTML = 'S';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();
      const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
      expect(details.innerHTML.trim()).toEqual(formulas.item['SUMO'].description);
    });

    it('should enter the formula when pressing enter', () => {
      input.innerHTML = 'S';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      expect(input.innerHTML).toEqual('SOM(');
    });
  });
});
