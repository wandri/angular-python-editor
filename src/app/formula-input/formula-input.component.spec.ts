import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';
import { Formula } from '../interfaces/formula';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { By } from '@angular/platform-browser';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    expect(input).toBeTruthy();
  });

  describe('with formula only', () => {
    const formulas = new Store<Formula>();
    formulas.addWithFormattingAndSorting([
      {
        name: 'SUM',
        description: 'SUM details',
        syntax: 'SUM(var 1,var2)',
        syntaxParameter: [1, 1],
        shortDescription: 'short Sum details'
      },
      {
        name: 'SOM',
        description: 'SOM details',
        syntax: 'SOM(var1,[var 2,...])',
        syntaxParameter: [1, 1000],
        shortDescription: 'short Som details'
      },
      {
        name: 'SUMO',
        description: 'SUMO details',
        syntax: 'SUMO(var1,[var 2])',
        syntaxParameter: [1, 0]
      },
      {
        name: 'PROD',
        description: 'PROD details',
        syntax: 'PROD([var 2])',
        syntaxParameter: [0]
      },
      {
        name: 'PI',
        description: 'PI details',
        syntax: 'PI()',
        syntaxParameter: []
      },
    ]);

    beforeEach(waitForAsync(() => {
      component.storedFormulas = formulas;
      component.storedVariables = new Store<Variable>();
    }));

    it('should display nothing when the user write something', () => {
      const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
      input.dispatchEvent(new Event('input'));
      const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
      expect(otherContent).toBeFalsy();
    });

    describe('Suggestions display', () => {

      it('should display 3 suggestions if the first letter match with formulas', () => {
        spyOn(component, 'getInputCaretIndex').and.returnValue(1);
        const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
        input.innerText = 'S';
        fixture.detectChanges();
        input.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();
        const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
        expect(otherContent).toBeTruthy();

        const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
        expect(suggestions.length).toEqual(3);
      });

      it('should filter the formula suggestions', () => {
        spyOn(component, 'getInputCaretIndex').and.returnValue(2);
        const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
        input.innerText = 'SO';
        input.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();
        const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
        expect(otherContent).toBeTruthy();

        const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
        expect(suggestions.length).toEqual(1);
      });

      it('should suggest a formula after a formula', () => {
        spyOn(component, 'getInputCaretIndex').and.returnValue(6);
        const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
        input.innerText = 'SUM(SO';
        input.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();
        const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
        expect(otherContent).toBeTruthy();

        const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
        expect(suggestions.length).toEqual(1);
      });

      it('should suggest a formula after an operator', () => {
        spyOn(component, 'getInputCaretIndex').and.returnValue(5);
        const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
        input.innerText = '3 + S';
        input.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();
        const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
        expect(otherContent).toBeTruthy();

        const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
        expect(suggestions.length).toEqual(3);
      });

      describe('Syntax display', () => {
        it('should display the syntax of a formula after a bracket', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(4);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = 'SUM(';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
          expect(details).toBeTruthy();
          expect(details.innerHTML.trim()).toContain('SUM(<span class="focus-argument">var 1</span>,var2)');
        });

        it('should not display the suggestions', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(4);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = 'SUM(';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const suggestions = fixture.debugElement.nativeElement.querySelector('.suggestions');
          expect(suggestions).toBeFalsy();
        });

        it('should display the syntax inside brackets', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(8);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = 'SUM(PI(), 4)';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
          expect(details).toBeTruthy();
          expect(details.innerHTML.trim()).toContain('SUM(<span class="focus-argument">var 1</span>,var2)');
        });

        it('should not display the syntax when outside operations with nested brackets', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(12);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = 'SUM([1,2]) + 1';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
          expect(details).toBeFalsy();
        });

        it('should not display the syntax when outside operations with nested brackets', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = '(SUM(1,4)+1)';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
          expect(details).toBeFalsy();
        });

        it('should display the syntax with focus on last argument', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(10);
          const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
          input.innerText = 'SUM(PI(), 4';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.formula-description');
          expect(details).toBeTruthy();
          expect(details.innerHTML.trim()).toContain('SUM(var 1,<span class="focus-argument">var2</span>)');
        });
      });

      it('the formula matching is case sensitive', () => {
        const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
        input.innerText = 's';
        input.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();
        const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
        expect(otherContent).toBeFalsy();
      });
    });

    describe('focus suggestion', () => {
      let input: HTMLInputElement;

      beforeEach(() => {
        input = fixture.debugElement.nativeElement.querySelector('.cell-input');
      });

      describe('Display of details', () => {
        it('should active the first suggestion and display its short description', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          input.innerText = 'S';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
          expect(details).toBeTruthy();
        });

        it('should display the short description', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          input.innerText = 'S';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
          expect(details.innerText.trim()).toEqual(formulas.item['SOM'].shortDescription);
        });

        it('should use the description if the short description is not provided', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(4);
          input.innerText = 'PROD';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
          expect(details.innerText.trim()).toEqual(formulas.item['PROD'].description);
        });
      });

      describe('navigation between suggestions', () => {
        it('should focus the next suggestion with ArrowDown', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          input.innerText = 'S';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.active .suggestion-short-description');
          const shortDescription = formulas.item['SUM'].shortDescription;
          expect(details.innerText.trim()).toEqual(shortDescription);
        });

        it('should focus the previous suggestion with ArrowUp', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          input.innerText = 'S';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
          fixture.detectChanges();
          const details = fixture.debugElement.nativeElement.querySelector('.active  .suggestion-short-description');
          expect(details.innerText.trim()).toEqual(formulas.item['SUMO'].description);
        });
      });

      describe('when pressing enter', () => {

        it('should enter the formula with a bracket', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(1);
          input.innerText = 'S';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
          fixture.detectChanges();
          expect(input.innerText).toEqual('SOM(');
        });

        it('should enter the formula with closing bracket for formula without argument', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(2);
          input.innerText = 'PI';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
          fixture.detectChanges();
          expect(input.innerText).toEqual('PI()');
        });

        it('should enter the formula after existing content', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(5);
          input.innerText = 'SUM(SO';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
          fixture.detectChanges();
          expect(input.innerText).toEqual('SUM(SOM(');
        });

        it('should enter the formula before existing content', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(2);
          input.innerText = 'SUM(SO';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
          fixture.detectChanges();
          expect(input.innerText).toEqual('SUMO(SO');
        });

        it('should enter the formula before existing content', () => {
          spyOn(component, 'getInputCaretIndex').and.returnValue(2);
          input.innerText = 'SU+1';
          input.dispatchEvent(new InputEvent('input'));
          fixture.detectChanges();
          fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
          fixture.detectChanges();
          expect(input.innerText).toEqual('SUM(+1');
        });

        describe('should enter the formula after special character', () => {
          const specialCharacters = ['/', '*', '+', '('];

          specialCharacters.forEach(character => {
            it(character + ' Without spaces', () => {
              spyOn(component, 'getInputCaretIndex').and.returnValue(4);
              input.innerText = `1${character}SU`;
              input.dispatchEvent(new InputEvent('input'));
              fixture.detectChanges();
              fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
              fixture.detectChanges();
              expect(input.innerText).toEqual('1' + character + 'SUM(');
            });

            it(character + ' With spaces', () => {
              spyOn(component, 'getInputCaretIndex').and.returnValue(6);
              input.innerText = `1 ${character} SU`;
              input.dispatchEvent(new InputEvent('input'));
              fixture.detectChanges();
              fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
              fixture.detectChanges();
              expect(input.innerText).toEqual('1 ' + character + ' SUM(');
            });
          });
        });

      });

    });

    it('should enter the suggestion on click', () => {
      spyOn(component, 'getInputCaretIndex').and.returnValue(2);
      const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
      input.innerText = 'SU';
      fixture.detectChanges();
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      const selection = fixture.debugElement.queryAll(By.css('.suggestion'))[1];
      selection.triggerEventHandler('mousedown', {});
      selection.triggerEventHandler('mouseup', {});

      fixture.detectChanges();
      expect(input.innerText).toEqual('SUMO(');
    });
  });

  describe('with variable only', () => {
    const variables = new Store<Variable>();
    variables.addWithFormattingAndSorting([
      {name: 'var 1', id: 'id var 1'},
      {name: 'SuperCarMatch', id: 'id SuperCarMatch'},
      {name: 'SUPER', id: 'id SUPER'},
      {name: 'Variable 2', id: 'id Variable 2'},
    ]);

    beforeEach(waitForAsync(() => {
      component.storedVariables = variables;
      component.storedFormulas = new Store<Formula>();
    }));
  });

  describe('translation into object', () => {
    const variables = new Store<Variable>();
    const formulas = new Store<Formula>();
    variables.addWithFormattingAndSorting([
      {name: 'var 1', id: 'id var 1'},
      {name: 'SuperCarMatch', id: 'id SuperCarMatch'},
      {name: 'SUPER', id: 'id SUPER'},
      {name: 'Variable 2', id: 'id Variable 2'},
    ]);
    formulas.addWithFormattingAndSorting([
      {
        name: 'SUM',
        description: 'SUM details',
        syntax: 'SUM(var 1,var2)',
        syntaxParameter: [1, 1],
        shortDescription: 'short Sum details'
      },
      {
        name: 'PI',
        description: 'PI details',
        syntax: 'PI()',
        syntaxParameter: []
      },
    ]);

    beforeEach(waitForAsync(() => {
      component.storedVariables = variables;
      component.storedFormulas = formulas;
    }));
  });
});
