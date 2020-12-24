import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula } from '../interfaces/formula';
import { storedFormulas } from '../dataset/formula-list';
import { splitInputText, suggestionNameWithSpaceBeforeIfExistent } from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { storedVariables } from '../dataset/variable-list';
import { InputType, } from '../interfaces/type.enum';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormulaInputComponent implements OnInit {
  suggestions: { name: string, type: InputType, variable?: Variable, formula?: Formula }[] = [];
  formulaText: string;
  formulas: Store<Formula> = {
    ids: [],
    item: {}
  };
  variables: Store<Variable> = {
    ids: [],
    item: {}
  };
  types = InputType;
  formulaSyntax: string;

  suggestionFocusIndex: number = 0;

  @ViewChild('formulaInput', { static: true }) formulaElement: ElementRef;

  getCaretIndex: (element: Node) => number = getCaretIndex;

  get caretIndex(): number {
    return this.getCaretIndex(this.formulaElement.nativeElement);
  }

  get areSuggestionsDisplayed(): boolean {
    return this.suggestions.length > 0;
  }

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  ngOnInit(): void {
    storedFormulas.forEach(formula => {
      this.formulas.item[formula.name] = formula;
      this.formulas.ids.push(formula.name);
    });
    this.formulas.ids.sort();

    storedVariables.forEach(variable => {
      this.variables.item[variable.name] = variable;
      this.variables.ids.push(variable.name);
    });
    this.variables.ids.sort();
  }

  onNameChange(): void {
    const cellInput = this.formulaElement.nativeElement;
    const text = cellInput.innerHTML;
    let formulaPropositionsNumber = 0;
    let variablePropositionsNumber = 0;
    let caretIndexToSlice = this.caretIndex;
    let isBracketPosition = text[this.caretIndex - 1] === '(';
    if (isBracketPosition) {
      caretIndexToSlice = this.caretIndex === 0 ? 0 : this.caretIndex - 1;
    }
    const formattedContents = text.slice(0, caretIndexToSlice).split(/[(\/+*-]/);
    const formattedContent = formattedContents[formattedContents.length - 1].trim();
    this.formulaSyntax = null;
    this.resetSuggestion();
    if (!!formattedContent) {
      for (let name of this.formulas.ids) {
        if (isBracketPosition && name === formattedContent) {
          this.formulaSyntax = this.formulas.item[name].syntax;
          break;
        } else if (!isBracketPosition && name.startsWith(formattedContent)) {
          this.suggestions.push({ type: InputType.FORMULA, name, formula: this.formulas.item[name] });
          formulaPropositionsNumber++;
          const limitFormulaSuggestionTo10 = formulaPropositionsNumber === 10;
          if (limitFormulaSuggestionTo10) {
            break;
          }
        }
      }

      for (let name of this.variables.ids) {
        if (!isBracketPosition && name.startsWith(formattedContent)) {
          this.suggestions.push({ type: InputType.VARIABLE, name, variable: this.variables.item[name] });
          variablePropositionsNumber++;
          const limitFormulaSuggestionTo10 = variablePropositionsNumber === 10;
          if (limitFormulaSuggestionTo10) {
            break;
          }
        }
      }
    }
    if (this.areSuggestionsDisplayed) {
      this.suggestionFocusIndex = 0;
    }
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  enterSelectedSuggestion(index: number): void {
    const isFormula = this.suggestions[index].type === InputType.FORMULA;
    const focusSuggestion = isFormula ? this.suggestions[index].formula : this.suggestions[index].variable;
    const inputElement = this.formulaElement.nativeElement;
    const { beforeContent, afterContent, focusContent } = splitInputText(inputElement.innerText, this.caretIndex);
    let formattedName = suggestionNameWithSpaceBeforeIfExistent(focusSuggestion.name, focusContent[0]);
    this.saveUserInput(`${beforeContent}${formattedName}(${afterContent}`);
    if (isFormula) {
      this.formulaSyntax = (focusSuggestion as Formula).syntax;
    }
    this.resetSuggestion();
    setTimeout(() => {
      setCaret(beforeContent.length + formattedName.length + 1, inputElement);
    }, 0);
  }

  selectSuggestion(index: number): void {
    if (this.areSuggestionsDisplayed) {
      this.enterSelectedSuggestion(index);
    }
  }

  onKeyDown($event: KeyboardEvent): void {
    if (this.areSuggestionsDisplayed) {
      if ($event.key === 'ArrowDown') {
        $event.preventDefault();
        this.selectNextSuggestion();
      }
      if ($event.key === 'ArrowUp') {
        $event.preventDefault();
        this.selectPreviousSuggestion();
      }
      if ($event.key === 'Enter') {
        $event.preventDefault();
        this.enterSelectedSuggestion(this.suggestionFocusIndex);
      }
    }
  }

  preventEnterKey($event: KeyboardEvent): void {
    if (!this.areSuggestionsDisplayed) {
      if ($event.key === 'Enter') {
        $event.preventDefault();
      }
    }
  }

  private resetSuggestion(): void {
    this.suggestions = [];
  }

  private selectPreviousSuggestion(): void {
    this.suggestionFocusIndex--;
    if (this.suggestionFocusIndex < 0) {
      this.suggestionFocusIndex = this.suggestions.length - 1;
    }
  }

  private selectNextSuggestion(): void {
    this.suggestionFocusIndex++;
    if (this.suggestionFocusIndex >= this.suggestions.length) {
      this.suggestionFocusIndex = 0;
    }
  }

  private saveUserInput(fullFormulas: string): void {
    this.formulaText = fullFormulas;
    this.formulaElement.nativeElement.innerHTML = this.formulaText;
  }
}
